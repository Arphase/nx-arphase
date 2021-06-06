import { LoadingService } from '@innovatech/ui/core/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ResetPasswordFormContainerComponent } from './reset-password-form-container.component';

describe('ResetPasswordFormContainerComponent', () => {
  let actions$ = new Observable<Action>();
  let spectator: Spectator<ResetPasswordFormContainerComponent>;
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
