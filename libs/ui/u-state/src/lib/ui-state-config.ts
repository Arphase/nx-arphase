import { InjectionToken } from '@angular/core';

export interface IvtUiStateConfiguration {
  apiUrl: string;
}

export const IVT_UI_STATE_CONFIGURATION = new InjectionToken<
  IvtUiStateConfiguration
>('Ivt Ui State configurations');
