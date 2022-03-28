import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

import { ENTITIES } from './entities';

const test = process.env.NODE_ENV === 'test' || process.env['NODE' + '_ENV'] === 'test';

if (test) {
  dotenv.config({ path: '.env.test' });
}

export default {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB || process.env.MRL_DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ENTITIES,

  // We are using migrations, synchronize should be set to false.
  synchronize: process.env.SYNCHRONIZE === 'true',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['libs/musicr/api/db/src/lib/migrations/**/*.js'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'libs/musicr/api/db/src/lib/migrations',
  },
  logging: !test,
} as TypeOrmModuleOptions;
