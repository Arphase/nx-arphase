import { PermissionService } from '@innovatech/ui/permissions/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';

import { RevisionCollectionService } from '../../services/revision-collection.service';
import { RevisionDataService } from '../../services/revision-data.service';
import { RevisionListContainerComponent } from './revision-list-container.component';

describe('RevisionListContainerComponent', () => {
  let spectator: Spectator<RevisionListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionListContainerComponent,
    shallow: true,
    providers: [
      {
        provide: PermissionService,
        useValue: { hasUpdatePermission: () => of(true) },
      },
    ],
    mocks: [RevisionCollectionService, RevisionDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
