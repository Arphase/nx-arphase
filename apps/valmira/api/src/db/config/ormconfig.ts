import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ENTITIES } from './entities';

export const typeormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB || process.env.VMA_DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: ENTITIES,
  synchronize: process.env.SYNCHRONIZE === 'true',
  logging: true,
  migrations: ['apps/valmira/api/src/db/migrations/**/*.js'],
};

export const dataSource = new DataSource(typeormConfig);
