import { UserRepository } from '@ivt/a-state';
import { User, UserRoles } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async getUsers(user: Partial<User>): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(user.companyId = :id)', { id: user.companyId });
    }

    return await query.getMany();
  }
}
