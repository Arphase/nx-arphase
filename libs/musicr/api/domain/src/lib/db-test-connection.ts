import { TypeOrmModule } from '@nestjs/typeorm';

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
} from '.';

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

export const TypeOrmUnitTestModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  keepConnectionAlive: false,
});
