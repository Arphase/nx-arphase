import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: '/api',
  version: packageJson.version,
  environmentName: 'stage',
};
