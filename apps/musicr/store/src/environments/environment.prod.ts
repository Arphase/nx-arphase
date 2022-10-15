import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  apiUrl: '/api',
  version: packageJson.version,
  production: true,
  innovatechUrl: (window as any).env?.innovatechUrl,
};
