import { GroupCollectionService, GroupDataService } from '@innovatech/ui/groups/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzModalService } from 'ng-zorro-antd/modal';

import { GroupListContainerComponent } from './group-list-container.component';

describe('GroupListContainerComponent', () => {
  let spectator: Spectator<GroupListContainerComponent>;
  const createComponent = createComponentFactory({
    component: GroupListContainerComponent,
    shallow: true,
    mocks: [GroupCollectionService, GroupDataService, NzModalService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
