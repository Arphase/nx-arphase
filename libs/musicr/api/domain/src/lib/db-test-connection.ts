import {
  AdditionalOptionEntity,
  AddressEntity,
  CategoryEntity,
  CustomerEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PriceOptionEntity,
  PriceOptionPhotoEntity,
  ProductComponentEntity,
  ProductEntity,
  ProductPhotoEntity,
  SocialEventEntity,
  SubcategoryEntity,
  UserEntity,
} from '@musicr/api/domain';
import { createConnection } from 'typeorm';

const entities = [
  AdditionalOptionEntity,
  AddressEntity,
  CategoryEntity,
  CustomerEntity,
  OrderEntity,
  OrderProductAdditionalOptionEntity,
  OrderProductEntity,
  PriceOptionEntity,
  PriceOptionPhotoEntity,
  ProductComponentEntity,
  ProductEntity,
  ProductPhotoEntity,
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
