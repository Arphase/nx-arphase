import { LoadingService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';

import { SignInFormContainerComponent } from './sign-in-form-container.component';

describe('SignInFormContainerComponent', () => {
  let spectator: Spectator<SignInFormContainerComponent>;
  const createComponent = createComponentFactory({
    component: SignInFormContainerComponent,
    mocks: [LoadingService],
    providers: [provideMockStore()],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
