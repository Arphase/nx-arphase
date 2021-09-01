import { createMockRepository } from '@arphase/api/testing';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResetPasswordEntity, UserEntity } from '@valmira/api/domain';
import { Connection } from 'typeorm';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(ResetPasswordEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(UserEntity), useValue: createMockRepository() },
        { provide: JwtService, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
