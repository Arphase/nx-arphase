import { IvtEmptyPipe } from '@ivt/u-ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockPipe } from 'ng-mocks';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let spectator: Spectator<UserListComponent>;
  const createComponent = createComponentFactory({
    component: UserListComponent,
    declarations: [MockPipe(IvtEmptyPipe)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});