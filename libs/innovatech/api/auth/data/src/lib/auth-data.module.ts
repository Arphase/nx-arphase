import { ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './services';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'test',
      signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION) || 3000 },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ResetPasswordEntity, UserEntity]),
  ],
  providers: [JwtStrategy, AuthService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthDataModule {}
