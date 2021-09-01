import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AdditionalProductsComponent } from './additional-products.component';

describe('AdditionalProductsComponent', () => {
  let spectator: Spectator<AdditionalProductsComponent>;
  const createComponent = createComponentFactory({
    component: AdditionalProductsComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
