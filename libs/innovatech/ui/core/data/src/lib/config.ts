import { InjectionToken } from '@angular/core';

export interface InnovatechConfiguration {
  apiUrl: string;
  version: string;
}

export const INNOVATECH_CONFIGURATION = new InjectionToken<InnovatechConfiguration>('Innovatech configuration');
