import { PermissionService } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';

import { RevisionRequestCollectionService } from '../../services/revision-request-collection.service';
import { RevisionRequestDataService } from '../../services/revision-request-data.service';
import { RevisionRequestListContainerComponent } from './revision-request-list-container.component';

describe('RevisionRequestListContainerComponent', () => {
  let spectator: Spectator<RevisionRequestListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionRequestListContainerComponent,
    shallow: true,
    mocks: [RevisionRequestCollectionService, RevisionRequestDataService, NzMessageService, PermissionService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
