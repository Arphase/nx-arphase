/* eslint-disable @typescript-eslint/no-explicit-any */
import packageJson from '../../../../../package.json';
import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: '/api',
  version: packageJson.version,
  environmentName: (window as any).env?.environmentName,
  stripeKey: (window as any).env?.stripeKey,
};
