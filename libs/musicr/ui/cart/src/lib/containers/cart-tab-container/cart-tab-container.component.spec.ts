import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { CartService } from '../../services/cart.service';
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
