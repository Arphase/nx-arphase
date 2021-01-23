import { CreateRevisionRequestDto, RevisionRequestRepository } from '@ivt/a-state';
import { RevisionRequest } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class RevisionRequestService {
  revisionRequestRepository: RevisionRequestRepository;

  constructor(private readonly connection: Connection) {
    this.revisionRequestRepository = this.connection.getCustomRepository(RevisionRequestRepository);
  }

  async createRevisionRequest(createRevisionRequestDto: CreateRevisionRequestDto): Promise<RevisionRequest> {
    const newRevisionRequest = await this.revisionRequestRepository.create(createRevisionRequestDto);
    await newRevisionRequest.save();
    return newRevisionRequest;
  }
}
