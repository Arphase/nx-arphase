import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';

import { SetPasswordFormContainerComponent } from './set-password-form-container.component';

describe('SetPasswordFormContainerComponent', () => {
  let spectator: Spectator<SetPasswordFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: SetPasswordFormContainerComponent,
    imports: [RouterTestingModule],
    mocks: [LoadingService],
    providers: [provideMockStore()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
