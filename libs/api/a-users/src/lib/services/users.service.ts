import { UserRepository } from '@ivt/a-state';
import { User, UserRoles } from '@ivt/c-data';
import { convertStringToNumberArray } from '@ivt/c-utils';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { FilterUsersDto } from '../dto/filter-users.dto';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async getUsers(filterDto: FilterUsersDto, user: Partial<User>): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(user.companyId = :id)', { id: user.companyId });
    }

    if (filterDto?.companyIds) {
      query.andWhere('(user.companyId IN (:...ids))', { ids: convertStringToNumberArray(filterDto.companyIds) });
    }

    return await query.getMany();
  }
}
