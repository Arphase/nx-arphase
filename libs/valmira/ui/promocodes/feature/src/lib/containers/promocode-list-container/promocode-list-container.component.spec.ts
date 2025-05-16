import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PromocodeCollectionService, PromocodeDataService } from '@valmira/ui/promocodes/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PromocodeListContainerComponent } from './promocode-list-container.component';

describe('PromocodeListContainerComponent', () => {
  let spectator: Spectator<PromocodeListContainerComponent>;
  const createComponent = createComponentFactory({
    component: PromocodeListContainerComponent,
    shallow: true,
    mocks: [PromocodeCollectionService, PromocodeDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
