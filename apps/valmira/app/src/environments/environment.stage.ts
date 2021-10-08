import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: '/api',
  version: packageJson.version,
  environmentName: 'prod',
  stripeKey:
    'pk_test_51JV2c7ESPeV0d6H2lO0kKw1xmjjF2Weew5BJStB4VzFQvE6qVu0o3YV2EBAOcTBqV8kx1kyJaLCTrFqYXdq5CMtr00Xu0BA9Gr',
};
