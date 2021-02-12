import { FilterUsersDto, UserRepository } from '@ivt/a-state';
import { IvtCollectionResponse, User, UserRoles } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async getUsers(filterDto: FilterUsersDto, user: Partial<User>): Promise<IvtCollectionResponse<User>> {
    const { sort, direction, companyIds, groupIds, text, pageIndex, pageSize } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    query
      .leftJoinAndSelect('user.company', 'company')
      .groupBy('user.id')
      .addGroupBy('company.id')
      .orderBy('user.createdAt', sortDirection.desc);

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(user.companyId = :id)', { id: user.companyId });
    }

    if (text) {
      query.andWhere(
        `LOWER(user.email) like :text OR LOWER(CONCAT(user.firstName, ' ', user.lastName, ' ', user.secondLastName)) like :text`,
        { text: `%${text.toLowerCase()}%` }
      );
    }

    if (groupIds) {
      query
        .innerJoin('company.group', 'group')
        .addGroupBy('group.id')
        .andWhere('(group.id IN (:...groupIds))', { groupIds });
    }

    if (companyIds) {
      query.andWhere('(company.id IN (:...companyIds))', { companyIds });
    }

    query.take(pageSize).skip(pageSize * (pageIndex - 1));

    const users = await query.getMany();
    const total = await query.getCount();

    return {
      info: {
        pageSize: pageSize,
        pageIndex: pageIndex,
        total,
        pageStart: (pageIndex - 1) * pageSize + 1,
        pageEnd: (pageIndex - 1) * pageSize + pageSize,
        last: users.length < pageSize,
      },
      results: users,
    };
  }
}
