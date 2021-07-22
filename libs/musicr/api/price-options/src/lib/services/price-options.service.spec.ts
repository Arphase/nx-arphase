import { PriceOptionEntity, TypeOrmUnitTestModule } from '@musicr/api/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PriceOptionsService } from './price-options.service';

describe('PriceOptionsService', () => {
  let service: PriceOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([PriceOptionEntity])],
      providers: [PriceOptionsService],
    }).compile();

    service = module.get<PriceOptionsService>(PriceOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
