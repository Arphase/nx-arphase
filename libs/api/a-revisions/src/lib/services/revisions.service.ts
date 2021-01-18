import { RevisionRepository } from '@ivt/a-state';
import { Revision } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateRevisionDto } from '../dto/create-revision.dto';
import { GetRevisionsDto } from '../dto/get-revisions.dto';

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
}
