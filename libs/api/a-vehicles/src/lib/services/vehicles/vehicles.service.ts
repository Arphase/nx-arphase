import { VehicleRepository } from '@ivt/a-state';
import { User, Vehicle } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateVehicleDto } from '../../dto';

@Injectable()
export class VehiclesService {
  vehicleRepository: VehicleRepository;

  constructor(private readonly connection: Connection) {
    this.vehicleRepository = this.connection.getCustomRepository(VehicleRepository);
  }

  async createVehicle(createVehicleDto: CreateVehicleDto, user: Partial<User>): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      userId: user.id,
    });
    await newVehicle.save();
    return newVehicle;
  }
}
