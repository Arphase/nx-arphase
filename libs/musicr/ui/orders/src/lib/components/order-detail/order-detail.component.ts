import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '@arphase/common';
import {
  Customer,
  Order,
  OrderProduct,
  orderStatusLabels,
  orderTypeLabels,
  SocialEvent,
  socialEventLabels,
} from '@musicr/domain';

@Component({
  selector: 'mrl-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class OrderDetailComponent {
  @Input() item: Order;
  orderTypeLabels = orderTypeLabels;
  socialEventLPlaceLabels = socialEventLabels;
  orderStatusLabels = orderStatusLabels;

  get customer(): Customer {
    return this.item?.customer;
  }

  get socialEvent(): SocialEvent {
    return this.item?.socialEvent;
  }

  get address(): Partial<Address> {
    return this.socialEvent?.address;
  }

  get products(): OrderProduct[] {
    return this.item?.orderProducts || [];
  }

  get requiresAssemblyLabel(): string {
    const requiresAssemblyLabels: Record<string, string> = {
      true: 'Si',
      false: 'No',
    };
    return requiresAssemblyLabels[String(this.socialEvent?.requiresAssembly)];
  }
}
