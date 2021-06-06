import { ResetPasswordRepository, UserRepository } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION) },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ResetPasswordRepository, UserRepository]),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthDataModule {}
