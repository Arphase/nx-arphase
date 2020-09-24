import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentOrder } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { GuaranteeCollectionService, PaymentOrderCollectionService, PaymentOrderDataService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { get } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-payment-order-dialog-container',
  templateUrl: './payment-order-dialog-container.component.html',
  styleUrls: ['./payment-order-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOrderDialogContainerComponent extends IvtFormContainerComponent<PaymentOrder> {
  loading$ = this.paymentOrderCollectionService.loading$;
  loadingDownloadSubject = new BehaviorSubject<boolean>(false);
  loadingDownload$ = this.loadingDownloadSubject.asObservable();

  constructor(
    protected paymentOrderCollectionService: PaymentOrderCollectionService,
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private paymentOrderDataService: PaymentOrderDataService,
    @Inject(MAT_DIALOG_DATA) public data: number[]
  ) {
    super(paymentOrderCollectionService);
  }

  generatePaymentOrder(paymentOrder: PaymentOrder): void {
    this.paymentOrderCollectionService.clearCache();
    this.paymentOrderCollectionService.currentItem$.pipe(filterNil(), take(1)).subscribe(currentPaymentOrder => {
      this.guaranteeCollectiionService.updateManyInCache(
        paymentOrder.guarantees.map(guarantee => ({ ...guarantee, paymentOrderId: currentPaymentOrder.id }))
      );
    });
    get(paymentOrder, 'id')
      ? this.paymentOrderCollectionService.update(paymentOrder)
      : this.paymentOrderCollectionService.add(paymentOrder);
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
