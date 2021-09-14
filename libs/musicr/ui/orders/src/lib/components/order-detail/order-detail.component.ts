import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address, Customer, Order, OrderProduct, SocialEvent } from '@musicr/domain';

@Component({
  selector: 'mrl-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailComponent {
  @Input() item: Order;

  get customer(): Customer {
    return this.item?.customer;
  }

  get socialEvent(): SocialEvent {
    return this.item?.socialEvent;
  }

  get address(): Address {
    return this.socialEvent?.address;
  }

  get products(): OrderProduct[] {
    return this.item?.orderProducts || [];
  }
}
