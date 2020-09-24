import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee } from '@ivt/c-data';
import { GuaranteeCollectionService, GuaranteeDataService, PaymentOrderCollectionService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<Guarantee> {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();
  excelFileName = 'Garantias';

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected guaranteeDataService: GuaranteeDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private dialog: MatDialog
  ) {
    super(guaranteeCollectionService, guaranteeDataService);
  }

  createPaymentOrder(guaranteeIds: number[]): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.dialog
      .open(PaymentOrderDialogContainerComponent, { data: guaranteeIds })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }
}
