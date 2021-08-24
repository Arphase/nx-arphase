import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductDetailContainerComponent } from './product-detail-container.component';

describe('ProductDetailContainerComponent', () => {
  let spectator: Spectator<ProductDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductDetailContainerComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
