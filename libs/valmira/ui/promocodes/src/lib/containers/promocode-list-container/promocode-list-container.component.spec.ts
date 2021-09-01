import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PromocodeCollectionService } from '../../services/promocode-collection.service';
import { PromocodeDataService } from '../../services/promocode-data.service';
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
