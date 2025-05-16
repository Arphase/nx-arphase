import { GroupCollectionService } from '@innovatech/ui/groups/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { GroupCheckboxFilterComponent } from './group-checkbox-filter.component';

describe('GroupCheckboxFilterComponent', () => {
  let spectator: Spectator<GroupCheckboxFilterComponent>;
  const createComponent = createComponentFactory({
    component: GroupCheckboxFilterComponent,
    providers: [{ provide: GroupCollectionService, useValue: { getWithQuery: jest.fn() } }],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
