import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  databaseConfig: {
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    database: process.env.DB,
    synchronize: false,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  server: {
    port: 3333,
  },
  environmentName: process.env.ENVIRONMENT_NAME,
};
