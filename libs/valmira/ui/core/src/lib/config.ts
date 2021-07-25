import { InjectionToken } from '@angular/core';

export interface ValmiraConfiguration {
  apiUrl: string;
  version: string;
}

export const VALMIRA_CONFIGURATION = new InjectionToken<ValmiraConfiguration>('Valmira configuration');
