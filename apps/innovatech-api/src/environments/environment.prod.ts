import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  databaseConfig: {
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    port: 5432,
    database: process.env.DATABASE || 'innovatech_dev',
    synchronize: false,
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
  },
  server: {
    port: 3333,
  }
};
