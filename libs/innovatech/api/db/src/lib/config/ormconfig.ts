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
  database: process.env.DATABASE || process.env.IVT_DB,
  username: process.env.USERNAME || process.env.DB_USERNAME,
  password: process.env.PASSWORD || process.env.DB_PASSWORD,
  entities: ENTITIES,

  // We are using migrations, synchronize should be set to false.
  synchronize: process.env.SYNCHRONIZE === 'true',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: ['libs/innovatech/api/db/src/lib/migrations/**/*.js'],
  logging: !test,
};

export const dataSource = new DataSource(typeormConfig);
