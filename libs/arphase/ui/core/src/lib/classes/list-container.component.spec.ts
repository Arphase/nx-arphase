import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApsCollectionService } from '../services/collection.service';
import { ApsDataService } from '../services/data.service';
import { ApsListContainerComponent } from './list-container.component';

describe('ApsListContainerComponent', () => {
  let spectator: Spectator<ApsListContainerComponent>;
  const createComponent = createComponentFactory({
    component: ApsListContainerComponent,
    shallow: true,
    mocks: [ApsCollectionService, ApsDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
