import { IvtEmptyPipe } from '@ivt/u-ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { GroupListComponent } from './group-list.component';

describe('GroupListComponent', () => {
  let spectator: Spectator<GroupListComponent>;
  const createComponent = createComponentFactory({
    component: GroupListComponent,
    declarations: [MockPipe(IvtEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
