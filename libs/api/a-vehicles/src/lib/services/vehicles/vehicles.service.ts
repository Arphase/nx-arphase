import { VehicleRepository } from '@ivt/a-state';
import { User, UserRoles, Vehicle } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateVehicleDto } from '../../dto';
import { GetVehiclesDto } from '../../dto/get-vehicles.dto';

@Injectable()
export class VehiclesService {
  vehicleRepository: VehicleRepository;

  constructor(private readonly connection: Connection) {
    this.vehicleRepository = this.connection.getCustomRepository(VehicleRepository);
  }

  async getVehicles(filterDto: GetVehiclesDto, user: Partial<User>): Promise<Vehicle[]> {
    const { sort, direction, offset, limit } = filterDto;
    const query = this.vehicleRepository.createQueryBuilder('vehicle');

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(vehicle.companyId = :id)', { id: user.companyId });
    }

    query.orderBy('vehicle.createdAt', sortDirection.desc);

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    query.take(limit).skip(offset);

    return await query.getMany();
  }

  async getVehicle(id: number): Promise<Vehicle> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const found = await query.where('vehicle.id = :id', { id }).getOne();
    if (!found) {
      throw new NotFoundException(`Vehicle with id "${id}" not found`);
    }
    return found;
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
