import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let spectator: Spectator<ProductDetailComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
