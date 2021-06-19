import { createCollectionResponse } from '@arphase/api';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { filterCommonQuery } from '@innovatech/api/core/util';
import { RevisionRepository, VehicleRepository } from '@innovatech/api/domain';
import { Revision, RevisionStatus, User, VehicleStatus } from '@innovatech/common/domain';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Connection, FindOneOptions } from 'typeorm';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { UpdateRevisionDto } from '../dto/update-revision.dto';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(RevisionRepository) private revisionRepository: RevisionRepository,
    @InjectRepository(VehicleRepository) private vehicleRepository: VehicleRepository,
    private connection: Connection
  ) {}

  async getRevisions(getRevisionsDto: GetRevisionsDto, user: Partial<User>): Promise<ApsCollectionResponse<Revision>> {
    const { vehicleId, pageIndex, pageSize, text, status } = getRevisionsDto;
    const query = this.revisionRepository
      .createQueryBuilder('revision')
      .leftJoinAndSelect('revision.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.user', 'user')
      .orderBy('revision.createdAt', SortDirection.descend);

    if (vehicleId) {
      query.andWhere('(revision.vehicleId = :id)', { id: vehicleId });
    }

    if (status) {
      query.andWhere('(revision.status = :status)', { status });
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

    filterCommonQuery('revision', query, getRevisionsDto, user, { companyidEntityName: 'vehicle' });

    const revisions = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(revisions, pageSize, pageIndex, total);
  }

  async getRevision(id: number): Promise<Revision> {
    const query = this.revisionRepository.createQueryBuilder('revision');
    const found = await query
      .leftJoinAndSelect('revision.vehicle', 'vehicle')
      .where('revision.id = :id', { id })
      .getOne();
    if (!found) {
      throw new NotFoundException(`Revision with id "${id}" not found`);
    }
    return found;
  }

  async createRevision(createRevisionDto: CreateRevisionDto): Promise<Revision> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newRevision = this.revisionRepository.create(createRevisionDto);
      await newRevision.save();
      await newRevision.reload();
      await this.updateVehicleStatus(createRevisionDto.status, newRevision.vehicleId);
      await queryRunner.commitTransaction();
      return newRevision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateRevision(updateRevisionDto: UpdateRevisionDto): Promise<Revision> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const preloadedRevision = await this.revisionRepository.preload(updateRevisionDto);

    await this.validateRevisionExpiration(preloadedRevision);

    try {
      const updatedRevision = await this.revisionRepository.save(updateRevisionDto);
      await preloadedRevision.reload();
      await this.updateVehicleStatus(updateRevisionDto.status, preloadedRevision.vehicleId);
      await queryRunner.commitTransaction();
      return updatedRevision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRevision(id: number): Promise<Revision> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const revision = await this.revisionRepository.findOne({ id });
    if (!revision) {
      throw new NotFoundException(`Revision with id "${id}" not found`);
    }

    await this.validateRevisionExpiration(revision);

    try {
      await this.revisionRepository.delete({ id });

      const mostRecentRevision = await this.revisionRepository.findOne({
        vehicleId: revision.vehicleId,
        order: { createdAt: SortDirection.descend },
      } as FindOneOptions);

      if (mostRecentRevision) {
        await this.updateVehicleStatus(RevisionStatus[mostRecentRevision.status], mostRecentRevision.vehicleId);
      }

      await queryRunner.commitTransaction();
      return revision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateVehicleStatus(status: RevisionStatus, vehicleId: number): Promise<void> {
    const statusMap: Record<RevisionStatus, VehicleStatus> = {
      [RevisionStatus.elegible]: VehicleStatus.elegible,
      [RevisionStatus.needsRepairs]: VehicleStatus.needsRevision,
      [RevisionStatus.notElegible]: VehicleStatus.notElegible,
    };

    const query = this.vehicleRepository.createQueryBuilder('vehicle');
    await query
      .update()
      .set({ status: statusMap[status] })
      .where('id = :id AND status != :status', { id: vehicleId, status: VehicleStatus.hasActiveGuarantee })
      .execute();
  }

  async validateRevisionExpiration(revision: Revision): Promise<void> {
    if (dayjs(revision.createdAt).isBefore(dayjs().subtract(3, 'months'))) {
      throw new ConflictException(`Revision with id ${revision.id} can't be edited because is expired`);
    }
  }
}
