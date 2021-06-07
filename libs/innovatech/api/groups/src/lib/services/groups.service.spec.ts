import { AuthService } from '@innovatech/api/auth/data';
import {
  CompanyRepository,
  GroupRepository,
  ProductRepository,
  ResetPasswordRepository,
  UserRepository,
} from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: GroupRepository, useValue: {} },
        { provide: CompanyRepository, useValue: {} },
        { provide: UserRepository, useValue: {} },
        { provide: ResetPasswordRepository, useValue: {} },
        { provide: ProductRepository, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: Connection, useValue: {} },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
