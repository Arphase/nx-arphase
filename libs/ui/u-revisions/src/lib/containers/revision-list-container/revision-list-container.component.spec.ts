import { IdentityFilterService, RevisionCollectionService, RevisionDataService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RevisionListContainerComponent } from './revision-list-container.component';

describe('RevisionListContainerComponent', () => {
  let spectator: Spectator<RevisionListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionListContainerComponent,
    shallow: true,
    mocks: [RevisionCollectionService, RevisionDataService, NzModalService, NzMessageService, IdentityFilterService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
