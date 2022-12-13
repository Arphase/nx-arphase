import { MUSIC_REVOLUTION_CONFIGURATION } from '@musicr/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SpaComponent } from './spa.component';

describe('SpaComponent', () => {
  let spectator: Spectator<SpaComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: SpaComponent,
    shallow: true,
    providers: [
      provideMockStore(),
      provideMockActions(() => actions$),
      { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: {} },
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
