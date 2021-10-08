import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@musicr/ui/cart/data';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  steps = [
    { name: 'Carrito', icon: 'shopping', path: ['products'], disabled$: of(false) },
    {
      name: 'Datos del evento',
      icon: 'form',
      path: ['social-event'],
      disabled$: this.cartService.cartItems$.pipe(map(cartItems => !cartItems.length)),
    },
    {
      name: 'Datos personales',
      icon: 'credit-card',
      path: ['personal-data'],
      disabled$: this.cartService.socialEvent$.pipe(map(socialEvent => !socialEvent?.name)),
    },
    {
      name: 'Confirmación',
      icon: 'like',
      path: ['confirmation'],
      disabled$: this.cartService.order$.pipe(map(order => !order?.id)),
    },
  ];

  constructor(private cartService: CartService) {}
}
