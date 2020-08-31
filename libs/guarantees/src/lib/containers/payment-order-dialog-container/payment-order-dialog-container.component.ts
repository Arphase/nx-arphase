import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentOrder } from '@ivt/data';
import { GuaranteeCollectionService, PaymentOrderCollectionService, PaymentOrderDataService } from '@ivt/state';
import { IvtFormContainerComponent } from '@ivt/ui';
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
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(paymentOrderCollectionService);
  }

  generatePaymentOrder(paymentOrder: PaymentOrder): void {
    this.paymentOrderCollectionService
      .add(paymentOrder)
      .pipe(take(1))
      .subscribe(() => this.guaranteeCollectiionService.updateManyInCache(paymentOrder.guarantees));
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
