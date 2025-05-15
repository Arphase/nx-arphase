import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';

@Component({
    selector: 'vma-confirmation-container',
    templateUrl: './confirmation-container.component.html',
    styleUrls: ['./confirmation-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ConfirmationContainerComponent {
  item$ = this.reservationCollectionService.currentItem$;

  constructor(private reservationCollectionService: ReservationCollectionService) {}
}
