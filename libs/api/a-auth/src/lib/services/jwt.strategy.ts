import { UserRepository } from '@ivt/a-state';
import { User } from '@ivt/c-data';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Connection } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userRepository: UserRepository;

  constructor(private connection: Connection) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async validate(user): Promise<Partial<User>> {
    const { email } = user;
    const userFromDatabase = await this.userRepository.findOne({ email });

    if (!userFromDatabase) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
