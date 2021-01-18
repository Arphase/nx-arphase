import { RevisionRepository } from '@ivt/a-state';
import { Revision } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CreateRevisionDto } from '../dto/create-revision.dto';

@Injectable()
export class RevisionsService {
  revisionRepository: RevisionRepository;

  constructor(private readonly connection: Connection) {
    this.revisionRepository = this.connection.getCustomRepository(RevisionRepository);
  }

  async createRevision(createRevisionDto: CreateRevisionDto): Promise<Revision> {
    const newRevision = this.revisionRepository.create(createRevisionDto);
    await newRevision.save();
    await newRevision.reload();
    return newRevision;
  }
}
