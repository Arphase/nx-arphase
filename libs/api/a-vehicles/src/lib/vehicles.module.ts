import { AuthDataModule } from '@innovatech/api/auth/data';
import { VehicleRepository } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository]), AuthDataModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
