import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let spectator: Spectator<AuthComponent>;
  const createComponent = createComponentFactory({
    component: AuthComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
