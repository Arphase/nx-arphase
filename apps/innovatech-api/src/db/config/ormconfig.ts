import { environment } from '@env/environment';
import { ConnectionOptions } from 'typeorm';

import { ENTITIES } from './entities';

const config: ConnectionOptions = {
  type: 'postgres',
  host: environment.databaseConfig.host,
  port: 5432,
  database: environment.databaseConfig.database,
  username: environment.databaseConfig.username,
  password: environment.databaseConfig.password,
  entities: ENTITIES,

  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['apps/innovatech-api/src/db/migrations/**/*.js'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'apps/innovatech-api/src/db/migrations',
  },
};

export = config;
