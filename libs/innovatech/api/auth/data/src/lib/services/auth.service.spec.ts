import { ResetPasswordEntity, TypeOrmUnitTestModule, UserEntity } from '@innovatech/api/domain';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([UserEntity, ResetPasswordEntity])],
      providers: [AuthService, { provide: JwtService, useValue: {} }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
