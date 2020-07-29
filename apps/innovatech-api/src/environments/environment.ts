import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  databaseConfig: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'ivt_dev',
    synchronize: true,
  },
  server: {
    port: 3333,
  },
  jwt: {
    secret: 'pqowieurytlaksjdhf',
    expiresIn: 3600,
  },
};
