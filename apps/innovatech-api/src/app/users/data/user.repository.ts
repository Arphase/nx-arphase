import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@innovatech/data';
import { SignUpCredentialsDto } from '@api/auth/dto/auth-credentials.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    const {
      password,
      email,
      firstName,
      secondName,
      lastName,
      secondLastName,
      role,
    } = signUpCredentialsDto;

    const user = new UserEntity();
    user.email = email;
    user.firstName = firstName;
    user.secondName = secondName;
    user.lastName = lastName;
    user.secondLastName = secondLastName;
    user.role = role;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
