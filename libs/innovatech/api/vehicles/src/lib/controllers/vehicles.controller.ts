import { ApsCollectionResponse } from '@arphase/common';
import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { User, UserRoles, Vehicle } from '@innovatech/common/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { GetVehiclesDto } from '../dto/get-vehicles.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { VehiclesService } from '../services/vehicles.service';

@Controller('vehicles')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async getVehicles(
    @Query() filterDto: GetVehiclesDto,
    @GetUser() user: Partial<User>,
  ): Promise<ApsCollectionResponse<Vehicle>> {
    return this.vehiclesService.getVehicles(filterDto, user);
  }

  @Get(':id')
  async getVehicle(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.getVehicle(id);
  }

  @Get('vin/:vin')
  async getVehicleFromVin(@Param('vin') vin: string, @GetUser() user: Partial<User>): Promise<Vehicle | null> {
    return this.vehiclesService.getVehicleFromVin(vin, user);
  }

  @Post()
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @GetUser() user: Partial<User>) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  updateVehicle(@Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle(updateVehicleDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle(id);
  }
}
