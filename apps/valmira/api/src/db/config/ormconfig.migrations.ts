import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { environment } from '../../environments/environment';
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
    migrationsDir: 'apps/valmira/api/src/db/migrations',
  },
  logging: true,
  migrations: ['apps/valmira/api/src/db/migrations/**/*.ts'],
};

export = config;
