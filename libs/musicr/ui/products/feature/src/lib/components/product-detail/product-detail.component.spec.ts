import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { Product } from '@musicr/domain';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let spectator: Spectator<ProductDetailComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailComponent,
    shallow: true,
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          product: {} as Product,
        },
      })),
  );
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
