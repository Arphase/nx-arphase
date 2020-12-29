import { ResetPassword, User } from '@ivt/c-data';
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

  /**
   * Sends the user an email to set his password
   * @param email User email
   * @returns response data about email status
   */
  @Post('/emailPassword')
  sendEmailResetPassword(@Body() user: Partial<User>): Promise<Record<string, boolean>> {
    return this.authService.sendResetPasswordEmail(user.email);
  }

  /**
   * Sets the usser password with a password token sent by email
   * @param resetPassword contains email, password, and token
   * @returns new passord
   */
  @Post('/setPassword')
  setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<User> {
    return this.authService.setPassword(resetPassword);
  }

  @Get('/validateToken/:passwordToken')
  validateToken(@Param('passwordToken') passwordToken: string): Promise<ResetPassword> {
    return this.authService.validateToken(passwordToken);
  }
}
