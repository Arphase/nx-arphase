import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Customer, Place, Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent {
  @Input() item: Reservation;

  get customer(): Customer {
    return this.item?.customer;
  }

  get place(): Place {
    return this.item?.place;
  }
}
