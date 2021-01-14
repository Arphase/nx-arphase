import { Module } from '@nestjs/common';
import { VehiclesController } from './controllers/vehicles/vehicles.controller';
import { VehiclesService } from './services/vehicles/vehicles.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [],
})
export class VehiclesModule {}
