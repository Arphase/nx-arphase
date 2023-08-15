import { UserCollectionService } from '@innovatech/ui/users/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { UserCheckboxFilterComponent } from './user-checkbox-filter.component';

describe('UserCheckboxFilterComponent', () => {
  let spectator: Spectator<UserCheckboxFilterComponent>;
  const createComponent = createComponentFactory({
    component: UserCheckboxFilterComponent,
    providers: [{ provide: UserCollectionService, useValue: { getWithQuery: jest.fn() } }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
