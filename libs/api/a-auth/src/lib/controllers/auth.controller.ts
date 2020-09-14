import { User } from '@ivt/c-data';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signIn(authCredentialsDto);
  }
}
