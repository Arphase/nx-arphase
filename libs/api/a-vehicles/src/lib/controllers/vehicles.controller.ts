import { GetUser, Roles, RolesGuard } from '@ivt/a-auth';
import { CreateVehicleDto, GetVehiclesDto, UpdateVehicleDto } from '@ivt/a-state';
import { IvtCollectionResponse, User, UserRoles, Vehicle } from '@ivt/c-data';
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

import { VehiclesService } from '../services/vehicles.service';

@Controller('vehicles')
@UseGuards(AuthGuard(), RolesGuard)
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  async getVehicles(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetVehiclesDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Vehicle>> {
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
  @UsePipes(ValidationPipe)
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @GetUser() user: Partial<User>) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateVehicle(@Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.updateVehicle(updateVehicleDto);
  }

  @Delete(':id')
  @Roles(UserRoles.superAdmin)
  async deleteVehicle(@Param('id', ParseIntPipe) id: number): Promise<Vehicle> {
    return this.vehiclesService.deleteVehicle(id);
  }
}
