import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let spectator: Spectator<UserFormComponent>;
  const createComponent = createComponentFactory({
    component: UserFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
