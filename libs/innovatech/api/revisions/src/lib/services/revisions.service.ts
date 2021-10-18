import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse, formatDate, SortDirection } from '@arphase/common';
import { filterCommonQuery, getReadableStream } from '@innovatech/api/core/util';
import { RevisionEntity, VehicleEntity } from '@innovatech/api/domain';
import {
  Revision,
  RevisionStatus,
  revisionStatusLabels,
  User,
  VehicleStatus,
  vehicleStatusLabels,
} from '@innovatech/common/domain';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import { Response } from 'express';
import { omit } from 'lodash';
import { Connection, FindOneOptions, QueryRunner, Repository } from 'typeorm';
import * as XLSX from 'xlsx';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { UpdateRevisionDto } from '../dto/update-revision.dto';
import { revisionExcelColumns } from './revision.service.constants';

@Injectable()
export class RevisionsService {
  constructor(
    @InjectRepository(RevisionEntity) private revisionRepository: Repository<RevisionEntity>,
    @InjectRepository(VehicleEntity) private vehicleRepository: Repository<VehicleEntity>,
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
        `(CAST (revision.id AS varchar) like :text OR
           LOWER(vehicle.vin) like :text OR
           LOWER(vehicle.brand) like :text OR
           LOWER(vehicle.model) like :text OR
           LOWER(vehicle.version) like :text)
          `,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    filterCommonQuery('revision', query, getRevisionsDto, user, { companyidEntityName: 'vehicle' });

    const revisions = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(revisions, pageSize, pageIndex, total);
  }

  async getRevision(id: number): Promise<RevisionEntity> {
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

  async getRevisionsExcel(filterDto: GetRevisionsDto, user: Partial<User>, response: Response): Promise<void> {
    const revisions = await (await this.getRevisions(omit(filterDto, ['pageIndex', 'pageSize']), user)).results;

    const revisionsData: string[][] = revisions.map(revision => {
      return [
        revision.id,
        formatDate(revision.createdAt),
        formatDate(revision.updatedAt),
        revisionStatusLabels[revision.status],
        revision.observations,
        revision.kilometrage,
        revision.reviewdBy,
        revision?.vehicle?.brand,
        revision?.vehicle?.model,
        revision?.vehicle?.version,
        revision?.vehicle?.year,
        revision?.vehicle?.vin,
        revision?.vehicle?.motorNumber,
        revision?.vehicle?.horsePower,
        vehicleStatusLabels[revision?.vehicle?.status],
        revision?.vehicle?.company?.businessName,
      ].map(field => (field ? String(field) : ''));
    });
    const data = [[...revisionExcelColumns], ...revisionsData];
    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, 'SheetJS');

    const buffer: Buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }

  async createRevision(createRevisionDto: CreateRevisionDto): Promise<Revision> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newRevision = this.revisionRepository.create(createRevisionDto);
      await queryRunner.manager.save(newRevision);
      await this.updateVehicleStatus(createRevisionDto.status, newRevision.vehicleId, queryRunner);
      await queryRunner.commitTransaction();
      await newRevision.reload();
      return newRevision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
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
      const updatedRevision = await queryRunner.manager.save(preloadedRevision);
      await this.updateVehicleStatus(updateRevisionDto.status, preloadedRevision.vehicleId, queryRunner);
      await queryRunner.commitTransaction();
      await preloadedRevision.reload();
      return updatedRevision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }

  async deleteRevision(id: number): Promise<Revision> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const revision = await this.getRevision(id);

    await this.validateRevisionExpiration(revision);

    try {
      await queryRunner.manager.remove(revision);
      const mostRecentRevision = await this.revisionRepository.findOne({
        vehicleId: revision.vehicleId,
        order: { createdAt: SortDirection.descend },
      } as FindOneOptions);
      if (mostRecentRevision) {
        await this.updateVehicleStatus(
          RevisionStatus[mostRecentRevision.status],
          mostRecentRevision.vehicleId,
          queryRunner
        );
      }
      await queryRunner.commitTransaction();
      return revision;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }

  async updateVehicleStatus(status: RevisionStatus, vehicleId: number, queryRunner: QueryRunner): Promise<void> {
    const statusMap: Record<RevisionStatus, VehicleStatus> = {
      [RevisionStatus.elegible]: VehicleStatus.elegible,
      [RevisionStatus.needsRepairs]: VehicleStatus.needsRevision,
      [RevisionStatus.notElegible]: VehicleStatus.notElegible,
    };

    const vehicle = await this.vehicleRepository.findOne({ id: vehicleId });

    if (vehicle && vehicle.status !== VehicleStatus.hasActiveGuarantee) {
      vehicle.status = statusMap[status];
      await queryRunner.manager.save(vehicle);
    }
  }

  async validateRevisionExpiration(revision: Revision): Promise<void> {
    if (dayjs(revision.createdAt).isBefore(dayjs().subtract(3, 'months'))) {
      throw new ConflictException(`Revision with id ${revision.id} can't be edited because is expired`);
    }
  }
}
