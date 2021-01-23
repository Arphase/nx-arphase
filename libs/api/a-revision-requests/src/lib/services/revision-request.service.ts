import { CreateRevisionRequestDto, RevisionRequestRepository } from '@ivt/a-state';
import { RevisionRequest } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RevisionRequestService {
  constructor(
    @InjectRepository(RevisionRequestRepository) private revisionRequestRepository: RevisionRequestRepository
  ) {}

  async createRevisionRequest(createRevisionRequestDto: CreateRevisionRequestDto): Promise<RevisionRequest> {
    const newRevisionRequest = await this.revisionRequestRepository.create(createRevisionRequestDto);
    await newRevisionRequest.save();
    return newRevisionRequest;
  }
}
