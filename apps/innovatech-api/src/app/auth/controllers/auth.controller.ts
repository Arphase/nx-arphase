import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { AuthService } from '../services/auth.service';
import { User } from '@ivt/data';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/sign-in')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signIn(authCredentialsDto);
  }
}
