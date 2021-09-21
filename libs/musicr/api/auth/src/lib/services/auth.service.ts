import { ResetPasswordEntity, UserEntity } from '@musicr/api/domain';
import { ResetPassword, User } from '@musicr/domain';
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
import { Connection, Repository } from 'typeorm';
import { v4 } from 'uuid';

import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignInCredentialsDto } from '../dto/sign-in-credentiails.dto';
import { SignUpCredentialsDto } from '../dto/sign-up-credentials.dto';
import { getResetPasswordEmailTemplate } from '../functions/reset-password-email-template';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ResetPasswordEntity) private resetPasswordRepository: Repository<ResetPasswordEntity>,
    private jwtService: JwtService,
    private readonly connection: Connection
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
      return this.userRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
    }

    const payload = omit(user, ['password', 'salt']);
    const token = await this.jwtService.sign(payload);

    return { ...payload, token };
  }

  async validateUserPassword(authCredentialsDto: SignInCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: [{ email }] });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  async setPassword(resetPassword: ResetPasswordDto): Promise<User> {
    const { userId, password, passwordToken } = resetPassword;
    const resetPasswordEntity = await this.resetPasswordRepository.findOne({ passwordToken });
    if (!resetPasswordEntity) {
      throw new NotFoundException(`Password token not found`);
    }

    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, user.salt);
      await queryRunner.manager.save(user);
      await queryRunner.manager.remove(resetPasswordEntity);
      queryRunner.commitTransaction();
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }

  async sendResetPasswordEmail(email: string): Promise<Record<string, boolean>> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const tokenEntity = await this.createResetPasswordToken(user.id);

    if (tokenEntity?.passwordToken) {
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
        from: `Music Revolution <${process.env.MAIL_ACCOUNT_SENDER}>`,
        to: user.email,
        subject: 'Restablecer Contraseña',
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/assets/img/logo.svg',
            cid: 'logo',
          },
        ],
        html: getResetPasswordEmailTemplate(`${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${user.id}`),
      };
      await transporter.sendMail(mailOptions);
      return { success: true };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async createResetPasswordToken(userId: number): Promise<ResetPassword> {
    const resetPassword = await this.resetPasswordRepository.findOne({ userId });
    const resetPasswordEntity = this.resetPasswordRepository.create({
      ...resetPassword,
      userId,
      passwordToken: v4(),
      timestamp: new Date(),
    });
    return this.resetPasswordRepository.save(resetPasswordEntity);
  }

  async validateToken(passwordToken: string): Promise<ResetPassword> {
    const resetToken = await this.resetPasswordRepository.findOne({ passwordToken });
    if (!resetToken) {
      throw new NotFoundException('Token not found');
    } else {
      return resetToken;
    }
  }
}
