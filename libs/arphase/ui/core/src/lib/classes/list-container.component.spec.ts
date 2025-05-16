import { ApsCollectionService, ApsDataService } from '@arphase/ui/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApsListContainerComponent } from './list-container.component';

describe('ApsListContainerComponent', () => {
  let spectator: Spectator<ApsListContainerComponent<unknown>>;
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
