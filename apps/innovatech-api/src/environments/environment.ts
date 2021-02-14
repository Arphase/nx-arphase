import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'aa6i74lcy90hh9.ckvaqjgmdubs.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'ebdb',
    synchronize: false,
    username: 'innovatechqa',
    password: 'Innovatech123',
  },
  server: {
    port: 3333,
  },
  environmentName: 'dev',
};
