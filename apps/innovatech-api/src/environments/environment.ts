import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'innovatech_dev',
    synchronize: true,
    username: 'innovatech',
    password: 'innovatech',
  },
  server: {
    port: 3333,
  },
  host: {
    url: 'http://localhost:4200/set-password',
    port: '3000',
  },
  mail: {
    host: 'smtp.ethereal.email',
    port: '587',
    secure: false,
    user: '<username>',
    pass: '<password>',
  },
};
