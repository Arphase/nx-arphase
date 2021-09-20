import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CartTabContainerComponent } from './cart-tab-container.component';

describe('CartTabContainerComponent', () => {
  let spectator: Spectator<CartTabContainerComponent>;
  const createComponent = createComponentFactory({
    component: CartTabContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
