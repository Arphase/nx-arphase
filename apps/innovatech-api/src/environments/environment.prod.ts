import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  databaseConfig: {
    type: 'postgres',
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE,
    synchronize: false,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  server: {
    port: 3333,
  },
  host: {
    url: '<server-url>',
    port: '3000',
  },
  mail: {
    host: '<smtp-host>',
    port: '<port>',
    secure: false,
    user: '<username>',
    pass: '<password>',
  },
};
