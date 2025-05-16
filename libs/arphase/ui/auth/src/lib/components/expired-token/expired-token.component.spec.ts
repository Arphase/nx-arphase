import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ExpiredTokenComponent } from './expired-token.component';

describe('ExpiredTokenComponent', () => {
  let spectator: Spectator<ExpiredTokenComponent>;
  const createComponent = createComponentFactory({
    component: ExpiredTokenComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
