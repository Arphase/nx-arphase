import { ApsCollectionResponse } from '@arphase/common';
import { dbTestConnection, ProductEntity, ProductRepository } from '@musicr/api/domain';
import { Product } from '@musicr/domain';
import { Connection, getConnection } from 'typeorm';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let db: Connection;
  let service: ProductsService;
  let repository: ProductRepository;

  beforeEach(async () => {
    db = await dbTestConnection;
    repository = await db.getRepository(ProductEntity);
    service = new ProductsService(repository);
  });

  afterEach(async () => {
    await getConnection('test').close();
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
