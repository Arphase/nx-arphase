import { UserRepository } from '@ivt/a-state';
import { UsersController, UsersService } from '@ivt/a-users';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION) },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, JwtStrategy, UserRepository, UsersService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
