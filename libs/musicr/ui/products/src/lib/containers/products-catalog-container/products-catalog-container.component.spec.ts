import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ProductsCatalogContainerComponent } from './products-catalog-container.component';

describe('ProductsCatalogContainerComponent', () => {
  let spectator: Spectator<ProductsCatalogContainerComponent>;
  const createComponent = createComponentFactory({
    component: ProductsCatalogContainerComponent,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
