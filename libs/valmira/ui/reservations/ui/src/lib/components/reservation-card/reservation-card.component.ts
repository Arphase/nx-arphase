import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { categoryLabels, Place, Promocode, Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationCardComponent {
  @Input() item: Reservation;

  categoryLabels = categoryLabels;

  get place(): Place {
    return this.item?.place;
  }

  get promocode(): Promocode {
    return this.item?.promocode;
  }
}
