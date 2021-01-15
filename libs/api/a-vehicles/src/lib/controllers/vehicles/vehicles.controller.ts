import { GetUser } from '@ivt/a-auth';
import { User } from '@ivt/c-data';
import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateVehicleDto } from '../../dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createGuarantee(@Body() createVehicleDto: CreateVehicleDto, @GetUser() user: Partial<User>) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }
}
