import { InjectionToken } from '@angular/core';

export interface IvtDataConfiguration {
  apiUrl: string;
}

export const IVT_DATA_CONFIGURATION = new InjectionToken<IvtDataConfiguration>(
  'Ivt Data configurations'
);
