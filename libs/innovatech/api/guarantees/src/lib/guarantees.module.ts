import { AuthDataModule } from '@innovatech/api/auth/data';
import { GuaranteeEntity, VehicleEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuaranteesController } from './controllers/guarantees.controller';
import { GuaranteesService } from './services/guarantees.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuaranteeEntity, VehicleEntity]), AuthDataModule],
  controllers: [GuaranteesController],
  providers: [GuaranteesService],
})
export class GuaranteesModule {}
