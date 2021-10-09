import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  apiUrl: '/api',
  version: packageJson.version,
  production: (window as any).env?.production,
  environmentName: (window as any).env?.environmentName,
  innovatechUrl: (window as any).env?.innovatechUrl,
};
