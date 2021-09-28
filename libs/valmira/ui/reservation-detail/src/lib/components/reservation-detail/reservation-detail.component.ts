import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDetailComponent {
  @Input() item: Reservation;
}
