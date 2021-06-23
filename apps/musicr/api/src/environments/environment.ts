import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'musicr',
    synchronize: true,
    username: 'musicr',
    password: 'musicr',
  },
  server: {
    port: 3333,
  },
  environmentName: 'dev',
};
