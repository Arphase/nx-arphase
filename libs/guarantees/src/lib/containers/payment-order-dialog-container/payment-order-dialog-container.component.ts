import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GuaranteeDataService, GuaranteeCollectionService } from '@ivt/state';
import { take, finalize } from 'rxjs/operators';
import { IvtFormContainerComponent } from '@ivt/ui';
import { Guarantee } from '@ivt/data';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ivt-payment-order-dialog-container',
  templateUrl: './payment-order-dialog-container.component.html',
  styleUrls: ['./payment-order-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOrderDialogContainerComponent extends IvtFormContainerComponent<Guarantee> {

  loadingPaymentOrderSubject = new BehaviorSubject<boolean>(false);
  loadingPaymentOrder$ = this.loadingPaymentOrderSubject.asObservable();

  constructor(
    private guaranteeDataService: GuaranteeDataService,
    private guaranteeCollectiionService: GuaranteeCollectionService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    super(guaranteeCollectiionService);
  }

  generatePaymentOrder(paymentOrder): void {
    this.loadingPaymentOrderSubject.next(true);
    this.guaranteeDataService.getPaymentOrder(paymentOrder).pipe(
      take(1),
      finalize(() => this.loadingPaymentOrderSubject.next(false))
    )
      .subscribe(()=>{
        this.guaranteeCollectiionService.updateManyInCache(paymentOrder.guarantees);
      });
  }

}
