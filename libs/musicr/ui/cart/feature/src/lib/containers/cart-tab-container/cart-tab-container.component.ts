import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filterNil } from '@arphase/ui/core';
import { CartService } from '@musicr/ui/cart/data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-cart-tab-container',
  templateUrl: './cart-tab-container.component.html',
  styleUrls: ['./cart-tab-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartTabContainerComponent {
  cartItems$ = this.cartService.cartItems$;
  total$ = this.cartService.orderPreview$.pipe(
    filterNil(),
    map(order => order.total)
  );

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
