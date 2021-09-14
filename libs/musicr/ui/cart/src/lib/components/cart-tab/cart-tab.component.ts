import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mrl-cart-tab',
  templateUrl: './cart-tab.component.html',
  styleUrls: ['./cart-tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartTabComponent {
  @Input() cartItems: any[]
  @Output() increaseItemAmount = new EventEmitter<number>();
  @Output() decreaseItemAmount = new EventEmitter<number>();
  @Output() removeItem = new EventEmitter<number>();
}
