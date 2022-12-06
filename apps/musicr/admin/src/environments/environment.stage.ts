import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: 'http://musicrevolution.us-east-1.elasticbeanstalk.com/api',
  innovatechUrl: 'https://api.innovatechcorp.com',
  version: packageJson.version,
  environmentName: 'stage',
};
