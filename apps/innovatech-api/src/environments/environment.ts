import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'innovatech_dev',
    synchronize: false,
    username: 'postgres',
    password: '1403'
  },
  server: {
    port: 3333,
  },
  jwt: {
    secret: 'pqowieurytlaksjdhf',
    expiresIn: 3600,
  },
};
