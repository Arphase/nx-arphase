import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'aa1avzes3vk45sa.ckvaqjgmdubs.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'ebdb',
    synchronize: false,
    username: 'innovatechstage',
    password: 'innovatech123',
  },
  server: {
    port: 3333,
  },
  environmentName: 'dev',
};
