import { ResetPasswordEntity, ResetPasswordRepository, UserRepository } from '@ivt/a-state';
import { ResetPassword, User } from '@ivt/c-data';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { Connection } from 'typeorm';

import { AuthCredentialsDto, SignUpCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  private resetPasswordRepository: ResetPasswordRepository;

  constructor(private jwtService: JwtService, private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
    this.resetPasswordRepository = this.connection.getCustomRepository(ResetPasswordRepository);
  }

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, salt, ...payload } = user;
    const token = await this.jwtService.sign(payload);

    return { ...payload, token };
  }

  async setPassword(email: string, newPassword: string): Promise<boolean> {
    return this.userRepository.setPassword(email, newPassword);
  }

  async removeResetPassword(resetPasswordEntity: ResetPasswordEntity) {
    return this.resetPasswordRepository.remove(resetPasswordEntity);
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

  async createResetPasswordToken(email: string): Promise<ResetPassword> {
    const resetPassword = await this.resetPasswordRepository.findOne({ email });
    const time = new Date().getTime();
    if (resetPassword && (time - resetPassword.timestamp.getTime()) / 60000 < 15) {
      throw new InternalServerErrorException();
    } else {
      const resetPasswordEntity = {
        ...resetPassword,
        email,
        passwordToken: (Math.floor(Math.random() * 9000000) + 1000000).toString(),
        timestamp: new Date(),
      };
      const updatedResetPassword = await this.resetPasswordRepository.save(resetPasswordEntity);
      if (updatedResetPassword) {
        return updatedResetPassword;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getResetPasswordEntity(passwordToken: string): Promise<ResetPasswordEntity> {
    return await this.resetPasswordRepository.findOne({ passwordToken });
  }

  async sendEmailResetPassword(email: string): Promise<boolean> {
    const userFromDb = await this.userRepository.findOne({ email });
    if (!userFromDb) throw new NotFoundException(`User with email "${email}" not found`);

    const tokenEntity = await this.createResetPasswordToken(email);

    if (tokenEntity && tokenEntity.passwordToken) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP,
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_ACCOUNT,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: `Company <${process.env.MAIL_ACCOUNT_SENDER}>`,
        to: email,
        subject: 'Asignar Contraseña',
        text: 'Asignar contraseña',
        html: `Hola! <br><br> En el siguiente link podrás asignar tu contraseña<br><br>
          <a href="${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${email}">
          Asignar Contraseña</a>`,
      };

      const sended = await new Promise<boolean>(async function (resolve, reject) {
        return await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log('Message sent: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        });
      });

      return sended;
    } else {
      throw new ForbiddenException('Usuario no registrado');
    }
  }

  async sendEmailToPendingUsers(emails: string[]): Promise<boolean> {
    const query = this.resetPasswordRepository.createQueryBuilder('resetPassword');
    const resetPasswords = await query.where(`resetPassword.email IN (:...emails)`, { emails }).getMany();
    resetPasswords.forEach(password => this.sendEmailResetPassword(password.email));
    return true;
  }
}
