import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let spectator: Spectator<ProductDetailComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
