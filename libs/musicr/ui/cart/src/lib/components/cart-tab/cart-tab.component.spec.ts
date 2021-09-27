import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CartTabComponent } from './cart-tab.component';

describe('CartTabComponent', () => {
  let spectator: Spectator<CartTabComponent>;
  const createComponent = createComponentFactory({
    component: CartTabComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
