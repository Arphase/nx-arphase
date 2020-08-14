import { UsersController } from '@api/users/controllers/users.controller';
import { UserRepository } from '@api/users/data/user.repository';
import { UsersService } from '@api/users/services/users.service';
import { environment } from '@env/environment';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, JwtStrategy, UserRepository, UsersService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
