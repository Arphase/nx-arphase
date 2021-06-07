import { AuthDataModule } from '@innovatech/api/auth/data';
import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [AuthDataModule],
  controllers: [AuthController],
})
export class AuthModule {}
