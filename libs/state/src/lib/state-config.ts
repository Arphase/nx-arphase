import { InjectionToken } from '@angular/core';

export interface IvtStateConfiguration {
  apiUrl: string;
  sepomexApi: string;
}

export const IVT_STATE_CONFIGURATION = new InjectionToken<IvtStateConfiguration>(
  'Ivt Data configurations'
);
