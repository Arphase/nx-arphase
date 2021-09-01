import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ReservationCollectionService } from '../../services/reservation-collection.service';

@Component({
  selector: 'vma-reservation-detail-container',
  templateUrl: './reservation-detail-container.component.html',
  styleUrls: ['./reservation-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDetailContainerComponent {
  currentItem$ = this.reservationCollectionService.currentItem$;
  constructor(private reservationCollectionService: ReservationCollectionService) {}
}
