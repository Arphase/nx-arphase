import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let spectator: Spectator<CartComponent>;
  const createComponent = createComponentFactory({
    component: CartComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
