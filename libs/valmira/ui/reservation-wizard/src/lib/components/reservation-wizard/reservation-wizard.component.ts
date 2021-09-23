import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reservation } from '@valmira/domain';

@Component({
  selector: 'vma-reservation-wizard',
  templateUrl: './reservation-wizard.component.html',
  styleUrls: ['./reservation-wizard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardComponent {
  @Input() item: Reservation;
}
