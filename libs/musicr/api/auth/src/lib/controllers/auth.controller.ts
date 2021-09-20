import { ResetPassword, User } from '@musicr/domain';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignInCredentialsDto } from '../dto/sign-in-credentiails.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    return this.authService.signIn(signInCredentialsDto);
  }

  @Post('/email-password')
  sendEmailResetPassword(@Body() user: Partial<User>): Promise<Record<string, boolean>> {
    return this.authService.sendResetPasswordEmail(user.email);
  }

  @Post('/set-password')
  setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<User> {
    return this.authService.setPassword(resetPassword);
  }

  @Get('/validate-token/:passwordToken')
  validateToken(@Param('passwordToken') passwordToken: string): Promise<ResetPassword> {
    return this.authService.validateToken(passwordToken);
  }
}
