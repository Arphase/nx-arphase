import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CartService } from '@musicr/ui/cart/data';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CartComponent implements OnInit {
  steps = [
    { name: 'Carrito', icon: 'shopping', path: ['products'], disabled$: of(false) },
    {
      name: 'Datos del evento',
      icon: 'form',
      path: ['social-event'],
      disabled$: combineLatest([this.cartService.cartItems$, this.cartService.orderType$]).pipe(
        map(([cartItems, orderType]) => !cartItems.length || !orderType),
      ),
    },
    {
      name: 'Datos personales',
      icon: 'credit-card',
      path: ['personal-data'],
      disabled$: this.cartService.socialEvent$.pipe(map(socialEvent => !socialEvent)),
    },
    {
      name: 'Confirmación',
      icon: 'like',
      path: ['confirmation'],
      disabled$: this.cartService.order$.pipe(map(order => !order?.id)),
    },
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.listenToCartItemsChange();
  }
}
