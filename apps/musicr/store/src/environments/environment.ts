import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://musicrevolution.us-east-1.elasticbeanstalk.com/api',
  innovatechUrl: 'http://ivt-stage.eba-mwtr49ds.us-east-1.elasticbeanstalk.com',
  version: packageJson.version,
  environmentName: 'dev',
};
