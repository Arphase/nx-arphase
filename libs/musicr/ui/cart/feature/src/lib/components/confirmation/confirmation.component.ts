import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Customer, Order } from '@musicr/domain';

@Component({
  selector: 'mrl-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  @Input() order: Order;

  get customer(): Customer {
    return this.order?.customer;
  }
}
