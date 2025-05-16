import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { AdditionalProductCollectionService, AdditionalProductDataService } from '@valmira/ui/additional-products/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
