import { ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { ResetPassword, User } from '@innovatech/common/domain';
import { generateId } from '@innovatech/common/utils';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { getManager, Repository } from 'typeorm';

import { getNewUserEmailTemplate } from '../constants/new-user-email-template';
import { getResetPasswordEmailTemplate } from '../constants/reset-password-email-template';
import { AuthCredentialsDto, SignUpCredentialsDto } from '../dto/auth-credentials.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ResetPasswordEntity) private resetPasswordRepository: Repository<ResetPasswordEntity>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    const { password } = signUpCredentialsDto;
    const salt = await bcrypt.genSalt();
    const encryptecPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      ...signUpCredentialsDto,
      salt,
      password: encryptecPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
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
    const resetPasswordEntity = this.resetPasswordRepository.create({
      ...resetPassword,
      userId,
      passwordToken: generateId(),
      timestamp: new Date(),
    });
    await resetPasswordEntity.save();
    return resetPasswordEntity;
  }

  async sendSetPasswordEmail(
    user: Partial<User>,
    resetPasswordEntity: ResetPassword
  ): Promise<Record<string, boolean>> {
    if (resetPasswordEntity && resetPasswordEntity.passwordToken) {
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
        to: user.email,
        subject: 'Bienvenido a Innovatech',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/assets/img/logo.png',
          },
        ],
        html: getNewUserEmailTemplate(
          `${process.env.MAIL_HOST_URL}/${resetPasswordEntity.passwordToken}/${resetPasswordEntity.userId}`
        ),
      };
      await transporter.sendMail(mailOptions);
      return { success: true };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async validateToken(passwordToken: string): Promise<ResetPassword> {
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
