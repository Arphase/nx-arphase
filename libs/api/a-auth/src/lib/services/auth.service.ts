import { ResetPasswordEntity, ResetPasswordRepository, UserEntity, UserRepository } from '@ivt/a-state';
import { ResetPassword, User } from '@ivt/c-data';
import { generateId } from '@ivt/c-utils';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Connection, getManager } from 'typeorm';

import { getNewUserEmailTemplate } from '../constants';
import { getResetPasswordEmailTemplate } from '../constants/reset-password-email-template';
import { AuthCredentialsDto, SignUpCredentialsDto } from '../dto/auth-credentials.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  private resetPasswordRepository: ResetPasswordRepository;

  constructor(private jwtService: JwtService, private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
    this.resetPasswordRepository = this.connection.getCustomRepository(ResetPasswordRepository);
  }

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    const { password, email, firstName, secondName, lastName, secondLastName, role } = signUpCredentialsDto;
    const user = new UserEntity();
    user.email = email;
    user.firstName = firstName;
    user.secondName = secondName;
    user.lastName = lastName;
    user.secondLastName = secondLastName;
    user.role = role;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = omit(user, ['password', 'salt']);
    const token = await this.jwtService.sign(payload);

    return { ...payload, token };
  }

  async setPassword(resetPassword: ResetPasswordDto): Promise<User> {
    const { userId, password, passwordToken } = resetPassword;
    const resetPasswordEntity = await this.resetPasswordRepository.findOne({ passwordToken });
    if (!resetPasswordEntity) {
      throw new NotFoundException(`Password token not found`);
    }

    const userFromDb = await this.userRepository.findOne({ id: userId });
    if (!userFromDb) {
      throw new NotFoundException(`User not found`);
    }

    await getManager().transaction(async transactionalEntityManager => {
      userFromDb.salt = await bcrypt.genSalt();
      userFromDb.password = await bcrypt.hash(password, userFromDb.salt);
      await transactionalEntityManager.save(userFromDb);
      await transactionalEntityManager.remove(resetPasswordEntity);
    });
    return userFromDb;
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: [{ email }],
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async createResetPasswordToken(userId: number): Promise<ResetPassword> {
    const resetPassword = await this.resetPasswordRepository.findOne({ userId });
    const resetPasswordEntity = {
      ...resetPassword,
      userId,
      passwordToken: generateId(),
      timestamp: new Date(),
    };
    const updatedResetPassword = await this.resetPasswordRepository.save(resetPasswordEntity);
    return updatedResetPassword;
  }

  async sendSetPasswordEmail(userId): Promise<Record<string, boolean>> {
    const userFromDb = await this.userRepository.findOne({ id: userId });
    if (!userFromDb) {
      throw new NotFoundException(`User not found`);
    }
    const tokenEntity = await this.createResetPasswordToken(userFromDb.id);

    if (tokenEntity && tokenEntity.passwordToken) {
      const transporter = createTransport({
        host: process.env.SMTP,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions: Mail.Options = {
        from: `Innovatech Garantías <${process.env.MAIL_ACCOUNT_SENDER}>`,
        to: userFromDb.email,
        subject: 'Bienvenido a Innovatech',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/assets/img/logo.png',
            cid: 'unique@kreata.ee',
          },
        ],
        html: getNewUserEmailTemplate(`${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${userFromDb.id}`),
      };
      await transporter.sendMail(mailOptions);
      return { success: true };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async sendEmailToPendingUsers(userIds: number[]): Promise<boolean> {
    const query = this.resetPasswordRepository.createQueryBuilder('resetPassword');
    const resetPasswords = await query.where(`resetPassword.userId IN (:...userIds)`, { userIds }).getMany();
    resetPasswords.forEach(password => this.sendSetPasswordEmail(password.userId));
    return true;
  }

  async validateToken(passwordToken: string): Promise<ResetPasswordEntity> {
    const resetToken = await this.resetPasswordRepository.findOne({ passwordToken });
    if (!resetToken) {
      throw new NotFoundException('Token not found');
    } else {
      return resetToken;
    }
  }

  async sendResetPasswordEmail(email: string): Promise<Record<string, boolean>> {
    const userFromDb = await this.userRepository.findOne({ email });
    if (!userFromDb) {
      throw new NotFoundException(`User not found`);
    }
    const tokenEntity = await this.createResetPasswordToken(userFromDb.id);

    if (tokenEntity && tokenEntity.passwordToken) {
      const transporter = createTransport({
        host: process.env.SMTP,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions: Mail.Options = {
        from: `Innovatech Garantías <${process.env.MAIL_ACCOUNT_SENDER}>`,
        to: userFromDb.email,
        subject: 'Restablecer Contraseña',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/assets/img/logo.png',
            cid: 'unique@kreata.ee',
          },
        ],
        html: getResetPasswordEmailTemplate(
          `${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${userFromDb.id}`
        ),
      };
      await transporter.sendMail(mailOptions);
      return { success: true };
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
