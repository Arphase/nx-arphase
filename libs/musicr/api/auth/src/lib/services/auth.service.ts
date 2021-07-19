import { UserRepository } from '@musicr/api/domain';
import { User } from '@musicr/domain';
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { omit } from 'lodash';

import { SignInCredentialsDto } from '../dto/sign-in-credentiails.dto';
import { SignUpCredentialsDto } from '../dto/sign-up-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    const { password } = signUpCredentialsDto;
    const salt = await bcrypt.genSalt();
    const encryptecPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      ...signUpCredentialsDto,
      salt,
      password: encryptecPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(signInCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos');
    }

    const payload = omit(user, ['password', 'salt']);
    const token = await this.jwtService.sign(payload);

    return { ...payload, token };
  }

  async validateUserPassword(authCredentialsDto: SignInCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({
      where: [{ email }],
    });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
