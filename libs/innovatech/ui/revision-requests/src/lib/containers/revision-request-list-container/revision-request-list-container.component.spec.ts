import { IdentityFilterService, RevisionRequestCollectionService, RevisionRequestDataService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionRequestListContainerComponent } from './revision-request-list-container.component';

describe('RevisionRequestListContainerComponent', () => {
  let spectator: Spectator<RevisionRequestListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestListContainerComponent,
    shallow: true,
    mocks: [RevisionRequestCollectionService, RevisionRequestDataService, NzMessageService, IdentityFilterService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
