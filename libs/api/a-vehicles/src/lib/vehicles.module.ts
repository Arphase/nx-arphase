import { AuthModule } from '@ivt/a-auth';
import { VehicleRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository]), AuthModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
