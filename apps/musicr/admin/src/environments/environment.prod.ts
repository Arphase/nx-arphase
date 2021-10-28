import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://musicrevolution.mx/api',
  version: packageJson.version,
  environmentName: 'prod',
};
