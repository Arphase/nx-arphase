import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import config from './ormconfig';

export default {
  ...config,
  cli: {
    migrationsDir: 'libs/musicr/api/db/src/lib/migrations',
  },
  migrations: ['libs/musicr/api/db/src/lib/migrations/**/*.ts'],
} as TypeOrmModuleOptions;
