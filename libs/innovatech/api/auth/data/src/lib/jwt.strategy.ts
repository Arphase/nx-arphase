import { UserEntity } from '@innovatech/api/domain';
import { User } from '@innovatech/common/domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(user): Promise<Partial<User>> {
    const { email } = user;
    const userFromDatabase = await this.userRepository.findOneBy({ email });

    if (!userFromDatabase) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
