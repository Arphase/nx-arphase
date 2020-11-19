import { User } from '@ivt/c-data';
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(signUpCredentialsDto): Promise<User> {
    const { password, email, firstName, secondName, lastName, secondLastName, role } = signUpCredentialsDto;

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

  async setPassword(email: string, newPassword: string): Promise<boolean> {
    const userFromDb = await this.findOne({ email });
    if (!userFromDb) throw new NotFoundException(`Usuario con el correo ${email} no encontrado`)

    userFromDb.salt = await bcrypt.genSalt();
    userFromDb.password = await bcrypt.hash(newPassword, userFromDb.salt);

    await userFromDb.save();
    return true;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
