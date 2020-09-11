import { UserRepository } from '@ivt/a-users';
import { User } from '@ivt/c-data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

import { AuthCredentialsDto, SignUpCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  constructor(private jwtService: JwtService, private readonly connection: Connection) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<User> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, salt, ...payload } = user;
    const token = await this.jwtService.sign(payload);

    return { ...payload, token };
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
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
