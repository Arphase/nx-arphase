import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let spectator: Spectator<UsersComponent>;
  const createComponent = createComponentFactory({
    component: UsersComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
