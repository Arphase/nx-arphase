import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'valmira',
    synchronize: true,
    username: 'valmira',
    password: 'valmira',
  },
  server: { port: 3333 },
  environmentName: 'dev',
};
