import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UserRepository } from '../data/user.repository';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }
}
