import { createMockRepository } from '@arphase/api/testing';
import { AuthService } from '@innovatech/api/auth/data';
import { CompanyEntity, GroupEntity, ProductEntity, ResetPasswordEntity, UserEntity } from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: AuthService, useValue: {} },
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(GroupEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(CompanyEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(UserEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(ResetPasswordEntity), useValue: createMockRepository() },
        { provide: getRepositoryToken(ProductEntity), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
