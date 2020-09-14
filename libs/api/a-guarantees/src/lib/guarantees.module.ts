import { AuthModule } from '@ivt/a-auth';
import { GuaranteeRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuaranteesController } from './controllers/guarantees.controller';
import { GuaranteesService } from './services/guarantees.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuaranteeRepository]), AuthModule],
  controllers: [GuaranteesController],
  providers: [GuaranteesService],
})
export class GuaranteesModule {}
