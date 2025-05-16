import { CartService } from '@musicr/ui/cart/data';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { CartTabContainerComponent } from './cart-tab-container.component';

describe('CartTabContainerComponent', () => {
  let spectator: Spectator<CartTabContainerComponent>;
  const createComponent = createComponentFactory({
    component: CartTabContainerComponent,
    shallow: true,
    providers: [{ provide: CartService, useValue: { orderPreview$: of({}), cartItems$: of([]) } }],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
