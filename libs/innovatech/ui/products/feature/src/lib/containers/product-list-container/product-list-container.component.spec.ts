import { ProductCollectionService, ProductDataService } from '@innovatech/ui/products/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductListContainerComponent } from './product-list-container.component';

describe('ProductListContainerComponent', () => {
  let spectator: Spectator<ProductListContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductListContainerComponent,
    shallow: true,
    mocks: [ProductCollectionService, ProductDataService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
