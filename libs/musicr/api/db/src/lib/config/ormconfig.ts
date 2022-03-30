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
  synchronize: process.env.SYNCHRONIZE === 'true',
  cli: {
    migrationsDir: 'libs/musicr/api/db/src/lib/migrations',
  },
  migrations: ['libs/musicr/api/db/src/lib/migrations/**/*.ts'],
  logging: !test,
} as TypeOrmModuleOptions;
