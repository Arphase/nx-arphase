import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionRequestCollectionService } from '../../services/revision-request-collection.service';
import { RevisionRequestDataService } from '../../services/revision-request-data.service';
import { RevisionRequestListContainerComponent } from './revision-request-list-container.component';

describe('RevisionRequestListContainerComponent', () => {
  let spectator: Spectator<RevisionRequestListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestListContainerComponent,
    shallow: true,
    mocks: [RevisionRequestCollectionService, RevisionRequestDataService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
