import { AuthDataModule } from '@innovatech/api/auth/data';
import {
  GuaranteeRepository,
  MoralPersonRepository,
  PhysicalPersonRepository,
  VehicleRepository,
} from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GuaranteesController } from './controllers/guarantees.controller';
import { GuaranteesService } from './services/guarantees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuaranteeRepository, MoralPersonRepository, PhysicalPersonRepository, VehicleRepository]),
    AuthDataModule,
  ],
  controllers: [GuaranteesController],
  providers: [GuaranteesService],
})
export class GuaranteesModule {}
