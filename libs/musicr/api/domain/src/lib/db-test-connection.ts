import { createConnection } from 'typeorm';

import {
  AdditionalOptionEntity,
  AddressEntity,
  CategoryEntity,
  CustomerEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PhotoEntity,
  PriceOptionEntity,
  ProductEntity,
  SocialEventEntity,
  SubcategoryEntity,
  UserEntity,
} from './entities';

const entities = [
  AdditionalOptionEntity,
  AddressEntity,
  CategoryEntity,
  CustomerEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PhotoEntity,
  PriceOptionEntity,
  ProductEntity,
  SocialEventEntity,
  SubcategoryEntity,
  UserEntity,
];

export const dbTestConnection = createConnection({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities,
  synchronize: true,
  logging: false,
  name: 'test',
});
