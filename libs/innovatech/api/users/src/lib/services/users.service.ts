import { CommonFilterDto, filterCommonQuery } from '@innovatech/api/core/util';
import { UserRepository } from '@innovatech/api/domain';
import { createCollectionResponse, IvtCollectionResponse, sortDirection, User } from '@innovatech/common/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async getUsers(filterDto: CommonFilterDto, user: Partial<User>): Promise<IvtCollectionResponse<User>> {
    const { text, pageIndex, pageSize } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    query
      .leftJoinAndSelect('user.company', 'company')
      .groupBy('user.id')
      .addGroupBy('company.id')
      .orderBy('user.createdAt', sortDirection.descend);

    if (text) {
      query.andWhere(
        `LOWER(user.email) like :text OR LOWER(CONCAT(user.firstName, ' ', user.lastName, ' ', user.secondLastName)) like :text`,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    filterCommonQuery('user', query, filterDto, user);

    const users = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(users, pageSize, pageIndex, total);
  }
}
