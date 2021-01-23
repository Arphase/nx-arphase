import { CreateRevisionRequestDto, RevisionRequestRepository } from '@ivt/a-state';
import { RevisionRequest, User } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RevisionRequestService {
  constructor(
    @InjectRepository(RevisionRequestRepository) private revisionRequestRepository: RevisionRequestRepository
  ) {}

  async createRevisionRequest(
    createRevisionRequestDto: CreateRevisionRequestDto,
    user: Partial<User>
  ): Promise<RevisionRequest> {
    const newRevisionRequest = await this.revisionRequestRepository.create({
      ...createRevisionRequestDto,
      userId: user.id,
      companyId: user.companyId,
    });
    await newRevisionRequest.save();
    return newRevisionRequest;
  }
}
