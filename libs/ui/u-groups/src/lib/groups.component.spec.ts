import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { GroupsComponent } from './groups.component';

describe('GroupsComponent', () => {
  let spectator: Spectator<GroupsComponent>;
  const createComponent = createComponentFactory({
    component: GroupsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
