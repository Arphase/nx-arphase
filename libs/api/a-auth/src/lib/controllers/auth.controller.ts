import { IResponse, ResponseError, ResponseSuccess, User } from '@ivt/c-data';
import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get('/resetPassword/:email')
  public async sendEmailResetPassword(@Param('email') email): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailResetPassword(email);
      if (isEmailSent) {
        return new ResponseSuccess('Se ha enviado el correo', null);
      } else {
        return new ResponseError('No se pudo enviar el correo');
      }
    } catch (error) {
      return new ResponseError('Error al enviar el correo', error);
    }
  }

  @Post('/resetPassword')
  public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      let isNewPasswordChanged = false;
      // if (resetPassword.email && resetPassword.currentPassword) {
      //   const isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
      //   if (isValidPassword) {
      //     isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
      //   } else {
      //     return new ResponseError('RESET_PASSWORD.WRONG_CURRENT_PASSWORD');
      //   }
      // } else
      if (resetPassword.passwordToken) {
        const resetPasswordEntity = await this.authService.getResetPasswordEntity(resetPassword.passwordToken);
        isNewPasswordChanged = await this.authService.setPassword(
          resetPasswordEntity.email,
          resetPassword.password
        );
        if (isNewPasswordChanged) await this.authService.removeResetPassword(resetPasswordEntity);
      } else {
        return new ResponseError('Error al cambiar contraseña');
      }
      return new ResponseSuccess('Se ha cambiado la contraseña', isNewPasswordChanged);
    } catch (error) {
      return new ResponseError('Error al cambiar la contraseña', error);
    }
  }
}
