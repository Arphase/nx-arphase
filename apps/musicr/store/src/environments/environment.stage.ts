import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: '/api',
  innovatechUrl: 'http://ivt-stage.eba-mwtr49ds.us-east-1.elasticbeanstalk.com',
  version: packageJson.version,
  environmentName: 'stage',
};
