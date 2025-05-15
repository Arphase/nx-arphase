import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Order } from '@musicr/domain';
import { NzModalService } from 'ng-zorro-antd/modal';
import { finalize, take } from 'rxjs/operators';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderDataService } from '../../services/order-data.service';
import { OrderDetailContainerComponent } from '../order-detail-container/order-detail-container.component';

@Component({
    selector: 'mrl-order-list-container',
    templateUrl: './order-list-container.component.html',
    styleUrls: ['./order-list-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrderListContainerComponent extends ApsListContainerComponent<Order> {
  constructor(
    protected orderCollectionService: OrderCollectionService,
    protected orderDataService: OrderDataService,
    protected modal: NzModalService
  ) {
    super(orderCollectionService, orderDataService, modal);
  }

  downloadPdf(id: number): void {
    this.loadingSubject.next(true);
    this.orderDataService
      .gerOrderPdf(id)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  onShowDetail(id: number): void {
    this.orderCollectionService
      .getByKey(id)
      .pipe(take(1))
      .subscribe(() =>
        this.modal.create({
          nzTitle: `Detalle de Orden`,
          nzContent: OrderDetailContainerComponent,
          nzFooter: null,
          nzWidth: '80vw',
        })
      );
  }
}
