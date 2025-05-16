import { LoadingService } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ResetPasswordFormContainerComponent } from './reset-password-form-container.component';

describe('ResetPasswordFormContainerComponent', () => {
  let spectator: Spectator<ResetPasswordFormContainerComponent>;
  const actions$ = new Observable<Action>();

  const createComponent = createComponentFactory({
    component: ResetPasswordFormContainerComponent,
    mocks: [LoadingService],
    providers: [provideMockStore(), provideMockActions(() => actions$)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
