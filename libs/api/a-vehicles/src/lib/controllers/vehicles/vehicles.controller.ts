import { GetUser } from '@ivt/a-auth';
import { User, Vehicle } from '@ivt/c-data';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateVehicleDto, UpdateVehicleDto } from '../../dto';
import { GetVehiclesDto } from '../../dto/get-vehicles.dto';
import { VehiclesService } from '../../services/vehicles/vehicles.service';

@Controller('vehicles')
@UseGuards(AuthGuard())
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async getVehicles(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetVehiclesDto,
    @GetUser() user: Partial<User>
  ): Promise<Vehicle[]> {
    return this.vehiclesService.getVehicles(filterDto, user);
  }

  @Get(':id')
  async getVehicle(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.getVehicle(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @GetUser() user: Partial<User>) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateVehicle(@Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle(updateVehicleDto);
  }

  @Delete(':id')
  async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle(id);
  }
}