import { createMockRepository } from '@arphase/api/testing';
import { ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: {} },
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(ResetPasswordEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
