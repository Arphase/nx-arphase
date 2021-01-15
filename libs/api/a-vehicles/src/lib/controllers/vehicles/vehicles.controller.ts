import { GetUser } from '@ivt/a-auth';
import { User, Vehicle } from '@ivt/c-data';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateVehicleDto } from '../../dto';
import { GetVehiclesDto } from '../../dto/get-vehicles.dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async getUsers(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetVehiclesDto,
    @GetUser() user: Partial<User>
  ): Promise<Vehicle[]> {
    return this.vehiclesService.getVehicles(filterDto, user);
  }

  @Get(':id')
  async getGuarantee(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.getVehicle(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createGuarantee(@Body() createVehicleDto: CreateVehicleDto, @GetUser() user: Partial<User>) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }
}
