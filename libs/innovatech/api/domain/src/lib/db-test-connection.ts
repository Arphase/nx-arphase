import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AddressEntity,
  ClientEntity,
  CompanyEntity,
  GroupEntity,
  GuaranteeEntity,
  LocalityEntity,
  MoralPersonEntity,
  PaymentOrderEntity,
  PhysicalPersonEntity,
  ProductEntity,
  ResetPasswordEntity,
  RevisionEntity,
  RevisionRequestEntity,
  UserEntity,
  VehicleEntity,
} from '.';

const entities = [
  AddressEntity,
  ClientEntity,
  CompanyEntity,
  GroupEntity,
  GuaranteeEntity,
  LocalityEntity,
  MoralPersonEntity,
  PaymentOrderEntity,
  PhysicalPersonEntity,
  ProductEntity,
  ResetPasswordEntity,
  RevisionEntity,
  RevisionRequestEntity,
  UserEntity,
  VehicleEntity,
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
