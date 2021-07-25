import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApsFormContainerComponent } from '@arphase/ui';
import { PaymentOrder } from '@innovatech/common/domain';
import { filterNil } from '@innovatech/common/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';
import { PaymentOrderCollectionService } from '../../services/payment-order-collection.service';
import { PaymentOrderDataService } from '../../services/payment-order-data.service';

@Component({
  selector: 'ivt-payment-order-dialog-container',
  templateUrl: './payment-order-dialog-container.component.html',
  styleUrls: ['./payment-order-dialog-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOrderDialogContainerComponent extends ApsFormContainerComponent<PaymentOrder> {
  @Input() data: number[];
  createSuccessMessage = 'Tu orden de compra se ha generado con éxito';
  updateSuccessMessage = 'Tu orden de compra se ha actualizado con éxito';
  loading$ = this.paymentOrderCollectionService.loading$;
  loadingDownloadSubject = new BehaviorSubject<boolean>(false);
  loadingDownload$ = this.loadingDownloadSubject.asObservable();

  constructor(
    protected paymentOrderCollectionService: PaymentOrderCollectionService,
    protected messageService: NzMessageService,
    protected modalRef: NzModalRef,
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private paymentOrderDataService: PaymentOrderDataService
  ) {
    super(paymentOrderCollectionService, null, messageService, modalRef);
  }

  generatePaymentOrder(paymentOrder: PaymentOrder): void {
    this.paymentOrderCollectionService.clearCache();
    this.paymentOrderCollectionService.currentItem$.pipe(filterNil(), take(1)).subscribe(currentPaymentOrder => {
      this.guaranteeCollectiionService.updateManyInCache(
        paymentOrder.guarantees.map(guarantee => ({
          ...guarantee,
          paymentOrderId: currentPaymentOrder.id,
          paymentOrder: currentPaymentOrder,
        }))
      );
    });
    paymentOrder.id
      ? this.paymentOrderCollectionService.update(paymentOrder)
      : this.paymentOrderCollectionService.add(paymentOrder, { isOptimistic: false });
  }

  downloadPaymentOrder(id: number): void {
    this.loadingDownloadSubject.next(true);
    this.paymentOrderDataService
      .getPaymentOrderPdf(id)
      .pipe(
        take(1),
        finalize(() => this.loadingDownloadSubject.next(false))
      )
      .subscribe();
  }
}
