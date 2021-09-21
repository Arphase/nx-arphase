import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'mrl-cart-tab-container',
  templateUrl: './cart-tab-container.component.html',
  styleUrls: ['./cart-tab-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTabContainerComponent {
  cartItems$ = this.cartService.cartItems$;

  constructor(private cartService: CartService) {}

  increaseItemAmount(index: number): void {
    this.cartService.increaseItemAmount(index);
  }

  decreaseItemAmount(index: number): void {
    this.cartService.decreaseItemAmount(index);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }
}
