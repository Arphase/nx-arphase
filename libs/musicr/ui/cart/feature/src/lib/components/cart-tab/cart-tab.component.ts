import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderProduct } from '@musicr/domain';

@Component({
    selector: 'mrl-cart-tab',
    templateUrl: './cart-tab.component.html',
    styleUrls: ['./cart-tab.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CartTabComponent {
  @Input() cartItems: OrderProduct[];
  @Input() total: number;
  @Output() increaseItemAmount = new EventEmitter<number>();
  @Output() decreaseItemAmount = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
}
