import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartService } from '@musicr/ui/cart/data';

@Component({
  selector: 'mrl-confirmation-container',
  templateUrl: './confirmation-container.component.html',
  styleUrls: ['./confirmation-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationContainerComponent {
  order$ = this.cartService.order$;
  constructor(private cartService: CartService) {}
}
