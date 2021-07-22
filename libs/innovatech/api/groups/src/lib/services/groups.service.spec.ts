import { AuthService } from '@innovatech/api/auth/data';
import {
  CompanyEntity,
  GroupEntity,
  ProductEntity,
  ResetPasswordEntity,
  TypeOrmUnitTestModule,
  UserEntity,
} from '@innovatech/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmUnitTestModule,
        TypeOrmModule.forFeature([GroupEntity, CompanyEntity, UserEntity, ResetPasswordEntity, ProductEntity]),
      ],
      providers: [GroupsService, { provide: AuthService, useValue: {} }, { provide: Connection, useValue: {} }],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
