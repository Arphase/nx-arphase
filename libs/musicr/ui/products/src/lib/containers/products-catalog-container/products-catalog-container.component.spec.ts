import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductsCatalogService } from '../../services/products-catalog.service';
import { ProductsCatalogContainerComponent } from './products-catalog-container.component';

describe('ProductsCatalogContainerComponent', () => {
  let spectator: Spectator<ProductsCatalogContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogContainerComponent,
    componentMocks: [ProductsCatalogService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
