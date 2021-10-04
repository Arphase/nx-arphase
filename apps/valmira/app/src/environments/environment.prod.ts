import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: '/api',
  version: packageJson.version,
  environmentName: 'prod',
  stripeKey:
    'pk_live_51JV2c7ESPeV0d6H2k9moacez9zL2t5U5kIbWPqyHmFtaMz10cCWAPYhT0ojOGuThZ9kplXP6dD2amFLtJXPyvlni00vG3WRZuU',
};
