import { ApsCollectionResponse } from '@arphase/common';
import { ProductEntity, TypeOrmUnitTestModule } from '@musicr/api/domain';
import { Product } from '@musicr/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmUnitTestModule, TypeOrmModule.forFeature([ProductEntity])],
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(ProductEntity));
  });

  it('should get the products collection', async () => {
    const product: Product = {
      name: 'test',
      price: 1000,
      disclaimer: 'test disclaimer',
      description: 'test description',
    };

    const expected: ApsCollectionResponse<Product> = {
      info: {
        total: 1,
        pageStart: 1,
        pageEnd: 1,
        last: true,
        pageSize: 10,
        pageIndex: 1,
      },
      results: [expect.objectContaining(product)],
    };

    await repository.insert(product);

    const payload = await service.getProducts({ pageSize: 10, pageIndex: 1 });

    expect(payload).toEqual(expected);
  });
});
