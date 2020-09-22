import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee, GuaranteeStatus, statusLabels } from '@ivt/c-data';
import {
  GuaranteeCollectionService,
  GuaranteeDataService,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
} from '@ivt/u-state';
import { IvtFolioPipe, IvtRowComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import {
  PaymentOrderDialogContainerComponent,
} from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-row-container',
  templateUrl: './guarantee-row-container.component.html',
  styleUrls: ['./guarantee-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowContainerComponent extends IvtRowComponent<Guarantee> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private guaranteeDataService: GuaranteeDataService,
    protected paymentOrderCollectionService: PaymentOrderCollectionService,
    private paymentOrderDataService: PaymentOrderDataService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private folioPipe: IvtFolioPipe
  ) {
    super();
  }

  downloadPdf(id: number): void {
    this.loadingSubject.next(true);
    this.guaranteeDataService
      .getGuaranteePdf(id)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  changeStatus(guarantee: Partial<Guarantee>): void {
    this.loadingSubject.next(true);
    this.guaranteeCollectiionService
      .update(guarantee)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(() =>
        this.toastr.success(
          `La garantía con folio ${this.folioPipe.transform(guarantee.id)} ahora está ${statusLabels[
            GuaranteeStatus[GuaranteeStatus[guarantee.status]]
          ].toLowerCase()}`
        )
      );
  }

  openPaymentOrderDialog(guaranteeId: number): void {
    this.dialog.open(PaymentOrderDialogContainerComponent, { data: guaranteeId });
  }

  downloadPaymentOrder(id: number): void {
    this.loadingSubject.next(true);
    this.paymentOrderDataService
      .getPaymentOrderPdf(id)
      .pipe(
        take(1),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
}
