import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { filterCommonQuery } from '@innovatech/api/core/util';
import { RevisionRequestEntity } from '@innovatech/api/domain';
import { RevisionRequest, User, UserRoles } from '@innovatech/common/domain';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRevisionRequestDto } from '../dto/create-revision-request.dto';
import { GetRevisionRequestsDto } from '../dto/get-revision-requests.dto';
import { UpdateRevisionRequestDto } from '../dto/update-revision-request.dto';

@Injectable()
export class RevisionRequestService {
  constructor(
    @InjectRepository(RevisionRequestEntity) private revisionRequestRepository: Repository<RevisionRequestEntity>,
  ) {}

  async getRevisionRequests(
    filterDto: GetRevisionRequestsDto,
    user: Partial<User>,
  ): Promise<ApsCollectionResponse<RevisionRequest>> {
    const { pageSize, pageIndex, text, status } = filterDto;
    const query = this.revisionRequestRepository
      .createQueryBuilder('revisionRequest')
      .leftJoinAndSelect('revisionRequest.vehicle', 'vehicle')
      .leftJoinAndSelect('revisionRequest.company', 'company')
      .leftJoinAndSelect('revisionRequest.user', 'user')
      .orderBy('revisionRequest.createdAt', SortDirection.descend);

    if (status) {
      query.andWhere('(revisionRequest.status = :status)', { status });
    }

    if (text) {
      query.andWhere(
        `(LOWER(vehicle.vin) like :text OR
           LOWER(revisionRequest.name) like :text OR
           LOWER(revisionRequest.phone) like :text OR
           LOWER(revisionRequest.email) like :text)
          `,
        { text: `%${text.toLowerCase()}%` },
      );
    }

    filterCommonQuery('revisionRequest', query, filterDto, user);

    const revisionRequests = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(revisionRequests, pageSize, pageIndex, total);
  }

  async getRevisionRequest(id: number): Promise<RevisionRequest> {
    const found = this.revisionRequestRepository.findOne({ where: { id }, relations: ['vehicle', 'address'] });
    if (!found) {
      throw new NotFoundException(`Revision request with id "${id}" not found`);
    }
    return found;
  }

  async createRevisionRequest(
    createRevisionRequestDto: CreateRevisionRequestDto,
    user: Partial<User>,
  ): Promise<RevisionRequest> {
    const newRevisionRequest = await this.revisionRequestRepository.create({
      ...createRevisionRequestDto,
      userId: user.id,
      companyId: user.companyId,
    });
    return this.revisionRequestRepository.save(newRevisionRequest);
  }

  async updateRevisionRequest(
    updateRevisionRequestDto: UpdateRevisionRequestDto,
    user: Partial<User>,
  ): Promise<RevisionRequest> {
    if (user && ![UserRoles.superAdmin, UserRoles.repairman].includes(user.role) && updateRevisionRequestDto.status) {
      throw new UnauthorizedException('Usuario no autorizado para actualizar solicitudes de revisión');
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
