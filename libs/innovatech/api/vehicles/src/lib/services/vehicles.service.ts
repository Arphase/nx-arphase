import { VehicleRepository } from '@innovatech/api/domain';
import {
  createCollectionResponse,
  hasAccessToAllData,
  IvtCollectionResponse,
  RevisionStatus,
  sortDirection,
  transformFolio,
  User,
  Vehicle,
  VehicleStatus,
} from '@innovatech/common/domain';
import { filterCommonQuery } from '@innovatech/api/core/util';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { GetVehiclesDto } from '../dto/get-vehicles.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(VehicleRepository) private vehicleRepository: VehicleRepository) {}

  async getVehicles(filterDto: GetVehiclesDto, user: Partial<User>): Promise<IvtCollectionResponse<Vehicle>> {
    const { pageSize, pageIndex, text, status } = filterDto;
    const query = this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.user', 'user')
      .orderBy('vehicle.createdAt', sortDirection.descend);

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

    if (status) {
      query.andWhere('(vehicle.status = :status)', { status });
    }

    filterCommonQuery('vehicle', query, filterDto, user);

    const vehicles = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(vehicles, pageSize, pageIndex, total);
  }

  async getVehicle(id: number): Promise<Vehicle> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const found = await query.where('vehicle.id = :id', { id }).getOne();
    if (!found) {
      throw new NotFoundException(`Vehicle with id "${id}" not found.`);
    }
    return found;
  }

  async getVehicleFromVin(vin: string, user: Partial<User>): Promise<Vehicle | null> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const vehicle = await query.where('vehicle.vin = :vin', { vin }).getOne();

    if (!vehicle) {
      throw new NotFoundException(`Vehículo con vin ${vin} no está dado de alta en el sistema.`);
    }

    if (user && !hasAccessToAllData(user.role)) {
      if (vehicle?.companyId !== user.companyId) {
        throw new ForbiddenException('Este vehículo pertenece a otra compañía.');
      }
    }

    return vehicle;
  }

  async createVehicle(createVehicleDto: CreateVehicleDto, user: Partial<User>): Promise<Vehicle> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    const vehicle = await query.where('vehicle.vin = :vin', { vin: createVehicleDto.vin }).getOne();

    if (vehicle) {
      throw new NotFoundException(
        `Vehículo con vin ${createVehicleDto.vin} ya se encuentra dado de alta en el sistema`
      );
    }

    const newVehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      companyId: user && hasAccessToAllData(user.role) ? createVehicleDto.companyId : user.companyId,
      userId: user.id,
    });
    await newVehicle.save();
    return newVehicle;
  }

  async updateVehicle(updateVehcleDto: UpdateVehicleDto): Promise<Vehicle> {
    const preloadedGuarantee = await this.vehicleRepository.preload(updateVehcleDto);
    await preloadedGuarantee.save();
    await preloadedGuarantee.reload();
    return preloadedGuarantee;
  }

  async deleteVehicle(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ id });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id "${id}" not found`);
    }

    if (vehicle?.guarantees?.length) {
      const folios = vehicle.guarantees.map(guarantee => transformFolio(guarantee.id)).toString();
      throw new BadRequestException(
        `El vehículo no puede ser eliminado porque tiene garantías con los siguientes folios: ${folios}`
      );
    }

    await this.vehicleRepository.delete({ id });

    return vehicle;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateVehicleStatusFromRevisions() {
    await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .update()
      .set({
        status: VehicleStatus.needsRevision,
      })
      .where(
        `NOT EXISTS(
          SELECT NULL
          FROM guarantees,
               revisions,
               vehicles
          WHERE (guarantees."vehicleId" = vehicles.id
              AND guarantees."endDate" > CURRENT_DATE - INTERVAL '0 days')
             OR (revisions."vehicleId" = vehicles.id
              AND revisions."createdAt" > CURRENT_DATE - INTERVAL '3 months'
              AND revisions.status = :revisionStatus )
              AND vehicles.status != :vehicleStatus )`,
        { vehicleStatus: VehicleStatus.notElegible, revisionStatus: RevisionStatus.elegible }
      )
      .execute();
  }
}
