import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let spectator: Spectator<CartComponent>;
  const createComponent = createComponentFactory({
    component: CartComponent,
    providers: [
      {
        provide: CartService,
        useValue: { cartItems$: of([]), socialEvent$: of({}), order$: of({}), listenToCartItemsChange: jest.fn() },
      },
    ],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
