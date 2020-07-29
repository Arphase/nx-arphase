import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../data/user.repository';
import { UserEntity } from '../data/user.entity';
import { Connection } from 'typeorm';
import { User } from '@innovatech/data';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }
}
