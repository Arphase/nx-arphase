import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AdditionalProductCollectionService } from '../../services/additional-product-collection.service';
import { AdditionalProductDataService } from '../../services/additional-product-data.service';
import { AdditionalProductListContainerComponent } from './additional-product-list-container.component';

describe('AdditionalProductListContainerComponent', () => {
  let spectator: Spectator<AdditionalProductListContainerComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalProductListContainerComponent,
    shallow: true,
    mocks: [AdditionalProductCollectionService, AdditionalProductDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
