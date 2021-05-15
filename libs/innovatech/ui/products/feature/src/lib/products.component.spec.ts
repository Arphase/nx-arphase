import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let spectator: Spectator<ProductsComponent>;
  const createComponent = createComponentFactory({
    component: ProductsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
