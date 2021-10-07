import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { environment } from '../../environments/environment.prod';
import { ENTITIES } from './entities';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: environment.databaseConfig.host,
  port: 5432,
  database: environment.databaseConfig.database,
  username: environment.databaseConfig.username,
  password: environment.databaseConfig.password,
  entities: ENTITIES,
  synchronize: false,
  cli: {
    migrationsDir: 'apps/musicr/api/src/db/migrations',
  },
  logging: true,
  migrations: ['apps/musicr/api/src/db/migrations/**/*.ts'],
};

export = config;
