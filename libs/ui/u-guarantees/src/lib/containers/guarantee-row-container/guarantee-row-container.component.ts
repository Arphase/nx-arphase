import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee, GuaranteeStatus, statusLabels, transformFolio, UserRoles } from '@ivt/c-data';
import {
  GuaranteeCollectionService,
  GuaranteeDataService,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
  PermissionService,
} from '@ivt/u-state';
import { IvtFolioPipe, IvtRowComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import {
  GuaranteeInvoiceNumberDialogContainerComponent,
} from '../guarantee-invoice-number-dialog-container/guarantee-invoice-number-dialog-container.component';
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
  isEditable$ = this.permissionService.hasUpdatePermission([UserRoles.agencyUser, UserRoles.superAdmin]);
  loading: boolean;

  constructor(
    private guaranteeCollectiionService: GuaranteeCollectionService,
    private guaranteeDataService: GuaranteeDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private paymentOrderDataService: PaymentOrderDataService,
    private modal: NzModalService,
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
    this.modal.create({
      nzTitle: 'Generar Orden de Pago',
      nzContent: PaymentOrderDialogContainerComponent,
      nzComponentParams: { data: [guaranteeId] },
      nzOkLoading: this.loading,
      nzOnOk: component => component.submitChild(),
    });
  }

  updatePaymentOrder(paymentOrderId: number): void {
    this.paymentOrderCollectionService
      .getByKey(paymentOrderId)
      .pipe(take(1))
      .subscribe(() =>
        this.modal.create({
          nzTitle: 'Editar Orden de Pago',
          nzContent: PaymentOrderDialogContainerComponent,
          nzOkLoading: this.loading,
          nzOnOk: component => component.submitChild(),
        })
      );
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

  editInvoiceNumber(guarantee: Guarantee): void {
    this.modal.create({
      nzTitle: `Actualizar número de gactura - Garantía ${transformFolio(guarantee.id)}`,
      nzContent: GuaranteeInvoiceNumberDialogContainerComponent,
      nzOnOk: component => component.submitChild(),
      nzComponentParams: { guarantee },
    });
  }
}
