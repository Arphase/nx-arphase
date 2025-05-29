import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Reservation } from '@valmira/domain';
import { ReservationCollectionService, ReservationDataService } from '@valmira/ui/reservations/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { ReservationDetailContainerComponent } from '../reservation-detail-container/reservation-detail-container.component';

@Component({
  selector: 'vma-reservation-list-container',
  templateUrl: './reservation-list-container.component.html',
  styleUrls: ['./reservation-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReservationListContainerComponent extends ApsListContainerComponent<Reservation> {
  constructor(
    protected reservationCollectionService: ReservationCollectionService,
    protected reservationDataService: ReservationDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
  ) {
    super(reservationCollectionService, reservationDataService, modal, messageService);
  }

  updateItem(item: Reservation): void {
    this.updateSuccessMessage = `La reservación con folio ${item.id} se ha actualizado`;
    super.updateItem(item);
  }

  onShowDetail(id: number): void {
    this.reservationCollectionService
      .getByKey(id)
      .pipe(take(1))
      .subscribe(() =>
        this.modal.create({
          nzTitle: 'Detalle de Reservación',
          nzContent: ReservationDetailContainerComponent,
          nzFooter: null,
          nzWidth: '80vw',
        }),
      );
  }
}
