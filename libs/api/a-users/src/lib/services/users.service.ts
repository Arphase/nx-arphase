import { FilterUsersDto, UserRepository } from '@ivt/a-state';
import { User, UserRoles } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async getUsers(filterDto: FilterUsersDto, user: Partial<User>): Promise<User[]> {
    const { sort, direction, companyIds, groupIds, text, offset, limit } = filterDto;
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

    query.take(limit).skip(offset);

    return await query.getMany();
  }
}
