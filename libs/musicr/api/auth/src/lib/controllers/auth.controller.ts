import { User } from '@musicr/domain';
import { Body, Controller, Post } from '@nestjs/common';

import { SignInCredentialsDto } from '../dto/sign-in-credentiails.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
