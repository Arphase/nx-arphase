import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Category } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerComponent {
  @Input() categories: Category[] = [];
  items$ = this.cartService.cartItems$.pipe(map(items => items?.length || 0));

  constructor(private cartService: CartService) {}
}
