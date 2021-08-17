import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui';
import { Reservation } from '@valmira/domain';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ReservationCollectionService } from '../../services/reservation-collection.service';
import { ReservationDataService } from '../../services/reservation-data.service';

@Component({
  selector: 'vma-reservation-list-container',
  templateUrl: './reservation-list-container.component.html',
  styleUrls: ['./reservation-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationListContainerComponent extends ApsListContainerComponent<Reservation> {
  constructor(
    protected reservationCollectionService: ReservationCollectionService,
    protected reservationDataService: ReservationDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(reservationCollectionService, reservationDataService, modal, messageService);
  }

  updateItem(item: Reservation): void {
    this.updateSuccessMessage = `La reservación con folio ${item.id} se ha actualizado`;
    super.updateItem(item);
  }
}
