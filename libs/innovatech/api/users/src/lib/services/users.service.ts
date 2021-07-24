import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { CommonFilterDto, filterCommonQuery } from '@innovatech/api/core/util';
import { UserEntity } from '@innovatech/api/domain';
import { User } from '@innovatech/common/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async getUsers(filterDto: CommonFilterDto, user: Partial<User>): Promise<ApsCollectionResponse<User>> {
    const { text, pageIndex, pageSize } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    query
      .leftJoinAndSelect('user.company', 'company')
      .groupBy('user.id')
      .addGroupBy('company.id')
      .orderBy('user.createdAt', SortDirection.descend);

    if (text) {
      query.andWhere(
        `(LOWER(user.email) like :text OR
        LOWER(user.firstName) like :text OR
        LOWER(user.lastName) like :text OR
        LOWER(user.secondLastName) like :text OR
        LOWER(CONCAT(user.firstName, ' ', user.lastName, ' ', user.secondLastName)) like :text)`,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    filterCommonQuery('user', query, filterDto, user);

    const users = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(users, pageSize, pageIndex, total);
  }
}
