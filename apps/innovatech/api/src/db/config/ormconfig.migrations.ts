import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import defaultConfig from './ormconfig';

const config: TypeOrmModuleOptions = {
  ...defaultConfig,
  migrations: ['apps/innovatech/api/src/db/migrations/**/*.ts'],
};

export default config;
