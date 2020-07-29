import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  databaseConfig: {
    type: 'postgres',
    host: 'ec2-54-175-117-212.compute-1.amazonaws.com',
    port: 5432,
    database: 'drqg21iajeqfe',
    synchronize: true,
  },
  server: {
    port: 3333,
  },
  jwt: {
    secret: 'pqowieurytlaksjdhf',
    expiresIn: 86400,
  },
};
