import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ENTITIES } from './entities';

const test = process.env.NODE_ENV === 'test' || process.env['NODE' + '_ENV'] === 'test';

export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE || process.env.IVT_DB,
  username: process.env.USERNAME || process.env.DB_USERNAME,
  password: process.env.PASSWORD || process.env.DB_PASSWORD,
  entities: ENTITIES,
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: !test,
  migrations: [`libs/innovatech/api/db/src/lib/migrations/**/*.${process.env.NODE_ENV === 'migrations' ? 'ts' : 'js'}`],
};

export const dataSource = new DataSource(typeormConfig);
