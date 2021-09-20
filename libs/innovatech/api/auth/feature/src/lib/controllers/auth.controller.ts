import { AuthCredentialsDto, AuthService, ResetPasswordDto } from '@innovatech/api/auth/data';
import { ResetPassword, User } from '@innovatech/common/domain';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/emailPassword')
  sendEmailResetPassword(@Body() user: Partial<User>): Promise<Record<string, boolean>> {
    return this.authService.sendResetPasswordEmail(user.email);
  }

  @Post('/setPassword')
  setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<User> {
    return this.authService.setPassword(resetPassword);
  }

  @Get('/validateToken/:passwordToken')
  validateToken(@Param('passwordToken') passwordToken: string): Promise<ResetPassword> {
    return this.authService.validateToken(passwordToken);
  }
}
