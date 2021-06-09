import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as defaultConfig from './ormconfig';

const config: TypeOrmModuleOptions = {
  ...defaultConfig,
  migrations: ['apps/innovatech/api/src/db/migrations/**/*.ts'],
};

export = config;
