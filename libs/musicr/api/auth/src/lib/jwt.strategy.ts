import { UserRepository } from '@musicr/api/domain';
import { User } from '@musicr/domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
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