import { CreateRevisionRequestDto, GetRevisionRequestsDto, RevisionRequestRepository } from '@ivt/a-state';
import { IvtCollectionResponse, RevisionRequest, User, UserRoles } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RevisionRequestService {
  constructor(
    @InjectRepository(RevisionRequestRepository) private revisionRequestRepository: RevisionRequestRepository
  ) {}

  async getRevisionRequests(
    filterDto: GetRevisionRequestsDto,
    user: Partial<User>
  ): Promise<IvtCollectionResponse<RevisionRequest>> {
    const { pageSize, pageIndex, sort, direction } = filterDto;
    const query = this.revisionRequestRepository
      .createQueryBuilder('revisionRequest')
      .leftJoinAndSelect('revisionRequest.vehicle', 'vehicle');

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.where('revisionRequest.companyId = :id', { id: user.companyId });
    }

    query.orderBy('revisionRequest.createdAt', sortDirection.desc);

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    query.take(pageSize).skip(pageSize * (pageIndex - 1));

    const revisionRequests = await query.getMany();
    const total = await query.getCount();

    return {
      info: {
        pageSize: pageSize,
        pageIndex: pageIndex,
        total,
        pageStart: (pageIndex - 1) * pageSize + 1,
        pageEnd: revisionRequests.length < total ? (pageIndex - 1) * pageSize + pageSize : total,
        last: revisionRequests.length < pageSize,
      },
      results: revisionRequests,
    };
  }

  async getRevisionRequest(id: number): Promise<RevisionRequest> {
    const query = this.revisionRequestRepository.createQueryBuilder('revisionRequest');
    const found = await query
      .leftJoinAndSelect('revisionRequest.vehicle', 'vehicle')
      .leftJoinAndSelect('revisionRequest.address', 'address')
      .where('revisionRequest.id = :id', { id })
      .getOne();
    if (!found) {
      throw new NotFoundException(`Revision request with id "${id}" not found`);
    }
    return found;
  }

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
