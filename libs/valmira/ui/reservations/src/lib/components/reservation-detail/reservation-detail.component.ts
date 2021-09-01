import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Customer, Place, Promocode, Reservation, ReservationAdditionalProduct } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDetailComponent {
  @Input() item: Reservation;

  get place(): Place {
    return this.item?.place;
  }

  get promocode(): Promocode {
    return this.item?.promocode;
  }

  get customer(): Customer {
    return this.item?.customer;
  }

  get additionalProducts(): ReservationAdditionalProduct[] {
    return this.item?.additionalProducts;
  }
}
