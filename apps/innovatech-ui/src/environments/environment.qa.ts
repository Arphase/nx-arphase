import * as packageJson from '../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'https://apiqa.innovatechcorp.com',
  version: packageJson.version,
  environmentName: 'qa',
};
