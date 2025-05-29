import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ENTITIES } from './entities';

const test = process.env.NODE_ENV === 'test' || process.env['NODE' + '_ENV'] === 'test';

if (test) {
  dotenv.config({ path: '.env.test' });
}

export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB || process.env.MRL_DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ENTITIES,
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: !test,
  migrations:
    process.env.NODE_ENV === 'migrations'
      ? [`libs/musicr/api/db/src/lib/migrations/**/*.ts`]
      : [`libs/musicr/api/db/src/lib/migrations/**/*.js`],
};

export const dataSource = new DataSource(typeormConfig);
