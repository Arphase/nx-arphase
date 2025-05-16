import { ApsEmptyPipe } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockPipe } from 'ng-mocks';

import { GroupListComponent } from './group-list.component';

describe('GroupListComponent', () => {
  let spectator: Spectator<GroupListComponent>;
  const createComponent = createComponentFactory({
    component: GroupListComponent,
    declarations: [MockPipe(ApsEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
