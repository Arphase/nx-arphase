import {
  CreateRevisionDto,
  GetRevisionsDto,
  RevisionRepository,
  UpdateRevisionDto,
  VehicleRepository,
} from '@ivt/a-state';
import { Revision, RevisionStatus, VehicleStatus } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(RevisionRepository) private revisionRepository: RevisionRepository,
    @InjectRepository(VehicleRepository) private vehicleRepository: VehicleRepository,
    private connection: Connection
  ) {}

  async getRevisions(getRevisionsDto: GetRevisionsDto): Promise<Revision[]> {
    const { vehicleId, sort, direction } = getRevisionsDto;
    const query = this.revisionRepository.createQueryBuilder('revision');

    query.leftJoinAndSelect('revision.vehicle', 'vehicle').orderBy('revision.createdAt', sortDirection.desc);

    if (vehicleId) {
      query.andWhere('(revision.vehicleId = :id)', { id: vehicleId });
    }

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    return await query.getMany();
  }

  async getRevision(id: number): Promise<Revision> {
    const query = this.revisionRepository.createQueryBuilder('revision');
    const found = await query.where('revision.id = :id', { id }).getOne();
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

      if (createRevisionDto.status === RevisionStatus.elegible) {
        const query = this.vehicleRepository.createQueryBuilder('vehicle');
        await query
          .update()
          .set({ status: VehicleStatus.elegible })
          .where('id = :id', { id: newRevision.vehicleId })
          .execute();
      }

      await queryRunner.commitTransaction();
      return newRevision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateRevision(updateRevisionDto: UpdateRevisionDto): Promise<Revision> {
    const preloadedRevision = await this.revisionRepository.preload(updateRevisionDto);
    await preloadedRevision.save();
    await preloadedRevision.reload();
    return preloadedRevision;
  }

  async deleteRevision(id: number): Promise<Revision> {
    const revision = await this.revisionRepository.findOne({ id });

    if (!revision) {
      throw new NotFoundException(`Revision with id "${id}" not found`);
    }

    await this.revisionRepository.delete({ id });

    return revision;
  }
}
