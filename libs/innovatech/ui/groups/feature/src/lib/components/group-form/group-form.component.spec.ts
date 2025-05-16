import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { GroupFormComponent } from './group-form.component';

describe('GroupFormComponent', () => {
  let spectator: Spectator<GroupFormComponent>;
  const createComponent = createComponentFactory({
    component: GroupFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
