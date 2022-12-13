import { ThemeService } from '@arphase/ui/core';
import { INNOVATECH_CONFIGURATION } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { SpaComponent } from './spa.component';

describe('SpaComponent', () => {
  let spectator: Spectator<SpaComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: SpaComponent,
    providers: [
      provideMockStore(),
      provideMockActions(() => actions$),
      { provide: INNOVATECH_CONFIGURATION, useValue: {} },
      { provide: PermissionService, useValue: { hasReadPermission: () => of(true) } },
    ],
    shallow: true,
    mocks: [ThemeService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
