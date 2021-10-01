import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProductDetailService } from '../../services/product-detail.service';
import { ProductDetailContainerComponent } from './product-detail-container.component';

describe('ProductDetailContainerComponent', () => {
  let spectator: Spectator<ProductDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailContainerComponent,
    imports: [RouterTestingModule],
    mocks: [ProductDetailService, CartService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
