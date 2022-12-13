import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductsCatalogComponent } from './products-catalog.component';

describe('ProductsCatalogComponent', () => {
  let spectator: Spectator<ProductsCatalogComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
