import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProductCollectionService } from '../../services/product-collection.service';
import { ProductDataService } from '../../services/product-data.service';
import { ProductListContainerComponent } from './product-list-container.component';

describe('ProductListContainerComponent', () => {
  let spectator: Spectator<ProductListContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductListContainerComponent,
    shallow: true,
    mocks: [ProductCollectionService, ProductDataService, NzModalService, NzMessageService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
