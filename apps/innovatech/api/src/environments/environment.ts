import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  server: { port: 3333 },
  environmentName: process.env.ENVIRONMENT_NAME,
};
