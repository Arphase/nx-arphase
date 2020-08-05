import { AddressEntity } from '@api/guarantees/data/entities/address.entity';
import { ClientEntity } from '@api/guarantees/data/entities/client.entity';
import { GuaranteeEntity } from '@api/guarantees/data/entities/guarantee.entity';
import { MoralPersonEntity } from '@api/guarantees/data/entities/moral-person.entity';
import { PhysicalPersonEntity } from '@api/guarantees/data/entities/physical-person.entity';
import { VehicleEntity } from '@api/guarantees/data/entities/vechicle.entity';
import { UserEntity } from '@api/users/data/user.entity';
import { ConnectionOptions } from 'typeorm';

const ENTITIES = [
  AddressEntity,
  UserEntity,
  GuaranteeEntity,
  ClientEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  VehicleEntity,
];

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'ivt_dev',
  entities: ENTITIES,

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['apps/innovatech-api/src/db/migrations/**/*{.ts}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'apps/innovatech-api/src/db/migrations',
  },
};

export = config;
