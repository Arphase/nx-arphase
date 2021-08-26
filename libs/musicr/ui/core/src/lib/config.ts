import { InjectionToken } from '@angular/core';

export interface MusicRevolutionConfiguration {
  apiUrl: string;
  version: string;
}

export const MUSIC_REVOLUTION_CONFIGURATION = new InjectionToken<MusicRevolutionConfiguration>(
  'Music Revolution configuration'
);
