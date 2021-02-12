import { CreateVehicleDto, GetVehiclesDto, UpdateVehicleDto, VehicleRepository } from '@ivt/a-state';
import { transformFolio, User, UserRoles, Vehicle, VehicleStatus } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(VehicleRepository) private vehicleRepository: VehicleRepository) {}

  async getVehicles(filterDto: GetVehiclesDto, user: Partial<User>): Promise<Vehicle[]> {
    const { sort, direction, offset, limit, text } = filterDto;
    const query = this.vehicleRepository.createQueryBuilder('vehicle');

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(vehicle.companyId = :id)', { id: user.companyId });
    }

    if (text) {
      query.andWhere(
        `LOWER(vehicle.vin) like :text OR
           LOWER(vehicle.brand) like :text OR
           LOWER(vehicle.model) like :text OR
           LOWER(vehicle.version) like :text
          `,
        { text: `%${text.toLowerCase()}%` }
      );
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

  async getVehicleFromVin(vin: string): Promise<Vehicle | null> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const found = await query.where('vehicle.vin = :vin', { vin }).getOne();
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

  async updateVehicle(updateVehcleDto: UpdateVehicleDto): Promise<Vehicle> {
    const updatedVehicle = await this.vehicleRepository.save(updateVehcleDto);
    return updatedVehicle;
  }

  async deleteVehicle(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ id });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id "${id}" not found`);
    }

    if (vehicle?.guarantees?.length) {
      const folios = vehicle.guarantees.map(guarantee => transformFolio(guarantee.id)).toString();
      throw new BadRequestException(
        `This vehicle can't be deleted because it has guarantees with the following folios: ${folios}`
      );
    }

    await this.vehicleRepository.delete({ id });

    return vehicle;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateVehicleStatusFromRevisions() {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    await query
      .update()
      .set({
        status: VehicleStatus.needsRevision,
      })
      .where(
        `NOT EXISTS(
          SELECT NULL
          FROM guarantees,
               revisions
          WHERE (guarantees."vehicleId" = vehicles.id
              AND guarantees."endDate" > CURRENT_DATE - INTERVAL '0 days')
             OR (revisions."vehicleId" = vehicles.id
              AND revisions."createdAt" > CURRENT_DATE - INTERVAL '3 months'
              AND revisions.status = '1')
      )`
      )
      .andWhere('vehicle.status != :status', { status: VehicleStatus.notElegible })
      .execute();
  }
}
