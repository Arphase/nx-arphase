import { IdentityFilterService, UserCollectionService, UserDataService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { UserListContainerComponent } from './user-list-container.component';

describe('UserListContainerComponent', () => {
  let spectator: Spectator<UserListContainerComponent>;
  const createComponent = createComponentFactory({
    component: UserListContainerComponent,
    shallow: true,
    mocks: [UserCollectionService, UserDataService, IdentityFilterService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
