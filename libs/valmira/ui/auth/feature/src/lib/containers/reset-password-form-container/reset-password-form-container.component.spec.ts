import { LoadingService } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ResetPasswordFormContainerComponent } from './reset-password-form-container.component';

describe('ResetPasswordFormContainerComponent', () => {
  let spectator: Spectator<ResetPasswordFormContainerComponent>;
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Action>();

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
