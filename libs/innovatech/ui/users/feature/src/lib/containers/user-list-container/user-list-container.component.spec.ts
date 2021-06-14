import { UserCollectionService, UserDataService } from '@innovatech/ui/users/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { UserListContainerComponent } from './user-list-container.component';

describe('UserListContainerComponent', () => {
  let spectator: Spectator<UserListContainerComponent>;
  const createComponent = createComponentFactory({
    component: UserListContainerComponent,
    shallow: true,
    mocks: [UserCollectionService, UserDataService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
