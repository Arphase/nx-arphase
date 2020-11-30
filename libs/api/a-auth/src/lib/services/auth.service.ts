import {
  IMAGE_ASSETS_PATH,
  ResetPasswordEntity,
  ResetPasswordRepository,
  tobase64,
  UserRepository,
} from '@ivt/a-state';
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
      console.log(__dirname + '/src/assets/img/logo.png');

      const mailOptions = {
        from: `Company <${process.env.MAIL_ACCOUNT_SENDER}>`,
        to: email,
        subject: 'Asignar Contraseña',
        text: 'Asignar contraseña',
        html: `
        <!doctype html>
        <html lang="en-US">

        <head>
          <meta content="text/html; charset=utf-8"
                http-equiv="Content-Type" />
          <title>Crear contraseña</title>
          <meta name="description"
                content="Reset Password Email Template.">
          <style type="text/css">
            a:hover {
              text-decoration: underline !important;
            }
          </style>
        </head>

        <body marginheight="0"
              topmargin="0"
              marginwidth="0"
              style="margin: 0px; background-color: #f2f3f8;"
              leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0"
                border="0"
                cellpadding="0"
                width="100%"
                bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
              <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;"
                      width="100%"
                      border="0"
                      align="center"
                      cellpadding="0"
                      cellspacing="0">
                  <tr>
                    <td style="height:80px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="height:20px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td>
                      <table width="95%"
                            border="0"
                            align="center"
                            cellpadding="0"
                            cellspacing="0"
                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                        <tr>
                          <td style="height:40px;">&nbsp;</td>
                        </tr>
                        <tr>
                          <td style="padding:0 35px;">
                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                              ¡Bienvenido a Innovatech!
                            </h1>
                            <span
                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                              Has recibido una invitación para entrar a la plataforma de Innovatech. Para crear la contraseña
                              para tu cuenta has click en el siguiente link.
                            </p>
                            <a href="${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${email}"
                              style="background:#3f5378;text-decoration:none !important; font-weight:500; margin-top:35px; margin-bottom:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                              Crear contrseña
                            </a>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                              Si el link no funciona copia y pega lo siguiente en tu navegador: ${process.env.MAIL_HOST_URL}/${tokenEntity.passwordToken}/${email}
                            </p>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                              Si no eres parte de uno de los grupos de Innovatech ignora este correo.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="height:40px;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  <tr>
                    <td style="height:20px;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="text-align:center;">
                      <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                        &copy; <strong>www.innovatechcorp.com</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:80px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--/100% body table-->
        </body>

        </html>
        `,
        // attachments: [
        //   {
        //     filename: 'logo.png',
        //     path: __dirname + '${IMAGE_ASSETS_PATH}logo.png',
        //     cid: 'logo',
        //   },
        // ],
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
