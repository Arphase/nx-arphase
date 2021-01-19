import { RevisionRepository } from '@ivt/a-state';
import { Revision } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';
import { UpdateRevisionDto } from '../dto/update-revision.dto';

@Injectable()
export class RevisionsService {
  revisionRepository: RevisionRepository;

  constructor(private readonly connection: Connection) {
    this.revisionRepository = this.connection.getCustomRepository(RevisionRepository);
  }

  async getRevisions(getRevisionsDto: GetRevisionsDto): Promise<Revision[]> {
    const { vehicleId } = getRevisionsDto;
    const query = this.revisionRepository.createQueryBuilder('revision');

    query.orderBy('revision.createdAt', sortDirection.desc);

    if (vehicleId) {
      query.andWhere('(revision.vehicleId = :id)', { id: vehicleId });
    }

    return await query.getMany();
  }

  async createRevision(createRevisionDto: CreateRevisionDto): Promise<Revision> {
    const newRevision = this.revisionRepository.create(createRevisionDto);
    await newRevision.save();
    await newRevision.reload();
    return newRevision;
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
