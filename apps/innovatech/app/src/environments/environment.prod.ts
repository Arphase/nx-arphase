import * as packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://api.innovatechcorp.com',
  version: packageJson.version,
  environmentName: 'prod',
};