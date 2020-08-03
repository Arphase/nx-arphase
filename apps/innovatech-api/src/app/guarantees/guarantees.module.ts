import { Module } from '@nestjs/common';

import { GuaranteesController } from './controllers/guarantees.controller';
import { GuaranteesService } from './services/guarantees.service';
import { GuaranteeRepository } from './data/guarantee.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@api/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GuaranteeRepository]), AuthModule],
  controllers: [GuaranteesController],
  providers: [GuaranteesService],
})
export class GuaranteesModule {}
