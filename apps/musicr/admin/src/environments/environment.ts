import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://localhost:3334/api',
  version: packageJson.version,
  environmentName: 'dev',
};
