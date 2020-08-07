import { ConnectionOptions } from 'typeorm';

import * as defaultConfig from './ormconfig';

const config: ConnectionOptions = {
  ...defaultConfig,
  migrations: ['apps/innovatech-api/src/db/migrations/**/*.ts'],
};

export = config;
