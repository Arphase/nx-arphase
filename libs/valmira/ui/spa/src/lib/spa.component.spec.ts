import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { VALMIRA_CONFIGURATION } from '@valmira/ui/core';
import { Observable } from 'rxjs';

import { SpaComponent } from './spa.component';

describe('SpaComponent', () => {
  let spectator: Spectator<SpaComponent>;
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: SpaComponent,
    shallow: true,
    providers: [
      provideMockStore(),
      provideMockActions(() => actions$),
      { provide: VALMIRA_CONFIGURATION, useValue: {} },
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
