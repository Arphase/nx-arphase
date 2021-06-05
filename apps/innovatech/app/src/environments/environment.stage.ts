import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://apistage.innovatechcorp.com',
  version: packageJson.version,
  environmentName: 'stage',
};
