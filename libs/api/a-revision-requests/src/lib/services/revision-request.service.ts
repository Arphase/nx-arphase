import {
  CreateRevisionRequestDto,
  filterCommonQuery,
  GetRevisionRequestsDto,
  RevisionRequestRepository,
  UpdateRevisionRequestDto,
} from '@ivt/a-state';
import { createCollectionResponse, IvtCollectionResponse, RevisionRequest, User, UserRoles } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    const { pageSize, pageIndex, text } = filterDto;
    const query = this.revisionRequestRepository
      .createQueryBuilder('revisionRequest')
      .leftJoinAndSelect('revisionRequest.vehicle', 'vehicle')
      .orderBy('revisionRequest.createdAt', sortDirection.desc);

    if (text) {
      query.andWhere(
        `LOWER(vehicle.vin) like :text OR
           LOWER(revisionRequest.name) like :text OR
           LOWER(revisionRequest.phone) like :text OR
           LOWER(revisionRequest.email) like :text
          `,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    filterCommonQuery('revisionRequest', query, filterDto, user);

    const revisionRequests = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(revisionRequests, pageSize, pageIndex, total);
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

  async updateRevisionRequest(
    updateRevisionRequestDto: UpdateRevisionRequestDto,
    user: Partial<User>
  ): Promise<RevisionRequest> {
    if (user && UserRoles[user.role] !== UserRoles.superAdmin && updateRevisionRequestDto.status) {
      throw new UnauthorizedException('Only super admin users can update revision request status');
    }
    const preloadedRevisionRequest = await this.revisionRequestRepository.preload(updateRevisionRequestDto);
    if (!preloadedRevisionRequest) {
      throw new NotFoundException(`Revision request with id "${updateRevisionRequestDto.id}" not found`);
    }
    await preloadedRevisionRequest.save();
    await preloadedRevisionRequest.reload();
    return preloadedRevisionRequest;
  }
}
