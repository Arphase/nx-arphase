import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RevisionCollectionService } from '../../services/revision-collection.service';
import { RevisionDataService } from '../../services/revision-data.service';
import { RevisionListContainerComponent } from './revision-list-container.component';

describe('RevisionListContainerComponent', () => {
  let spectator: Spectator<RevisionListContainerComponent>;
  const createComponent = createComponentFactory({
    component: RevisionListContainerComponent,
    imports: [RouterTestingModule],
    mocks: [RevisionCollectionService, RevisionDataService, NzModalService, NzMessageService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
