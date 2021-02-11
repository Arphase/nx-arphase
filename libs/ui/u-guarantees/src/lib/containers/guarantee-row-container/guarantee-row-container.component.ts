import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee, GuaranteeStatus, statusLabels, UserRoles } from '@ivt/c-data';
import {
  GuaranteeCollectionService,
  GuaranteeDataService,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
  PermissionService,
} from '@ivt/u-state';
import { IvtFolioPipe, IvtRowComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { GuaranteeInvoiceNumberDialogContainerComponent } from '../guarantee-invoice-number-dialog-container/guarantee-invoice-number-dialog-container.component';
import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-row-container',
  templateUrl: './guarantee-row-container.component.html',
  styleUrls: ['./guarantee-row-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowContainerComponent extends IvtRowComponent<Guarantee> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  isEditable$ = this.permissionService.hasUpdatePermission([UserRoles.agencyUser, UserRoles.superAdmin]);

  constructor(
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private guaranteeDataService: GuaranteeDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private paymentOrderDataService: PaymentOrderDataService,
    private dialog: MatDialog,
    private messageService: NzMessageService,
    private folioPipe: IvtFolioPipe,
    private permissionService: PermissionService
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
        this.messageService.success(
          `La garantía con folio ${this.folioPipe.transform(guarantee.id)} ahora está ${statusLabels[
            GuaranteeStatus[GuaranteeStatus[guarantee.status]]
          ].toLowerCase()}`
        )
      );
  }

  createPaymentOrder(guaranteeId: number): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.dialog.open(PaymentOrderDialogContainerComponent, { data: [guaranteeId], maxWidth: '90w' });
  }

  updatePaymentOrder(paymentOrderId: number): void {
    this.paymentOrderCollectionService
      .getByKey(paymentOrderId)
      .pipe(take(1))
      .subscribe(() => this.dialog.open(PaymentOrderDialogContainerComponent, { maxWidth: '90w' }));
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

  editInvoiceNumber(data: Guarantee): void {
    this.dialog.open(GuaranteeInvoiceNumberDialogContainerComponent, { data });
  }
}
