import { ProductCollectionService, ProductDataService } from '@musicr/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
