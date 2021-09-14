import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services/cart.service';
// import { Product } from '@musicr/domain'

@Component({
  selector: 'mrl-cart-tab-container',
  templateUrl: './cart-tab-container.component.html',
  styleUrls: ['./cart-tab-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTabContainerComponent {
  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  increaseItemAmount(index: number) {
    this.cartService.increaseItemAmount(index);
  }

  decreaseItemAmount(index: number) {
    this.cartService.decreaseItemAmount(index);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
}
