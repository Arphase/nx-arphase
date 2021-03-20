import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Guarantee, GuaranteeStatus, statusLabels, transformFolio, UserRoles } from '@ivt/c-data';
import {
  GuaranteeCollectionService,
  GuaranteeDataService,
  IdentityFilterService,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
  PermissionService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';

import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<Guarantee> {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();
  excelFileName = 'Garantias';
  canModifyPaymentOrders$ = this.permissionService.hasCreatePermission([UserRoles.superAdmin]);

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected guaranteeDataService: GuaranteeDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    protected identityFilterService: IdentityFilterService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private paymentOrderDataService: PaymentOrderDataService,
    private permissionService: PermissionService
  ) {
    super(guaranteeCollectionService, guaranteeDataService, modal, messageService, identityFilterService);
  }

  createPaymentOrder(guaranteeIds: number[]): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.modal
      .create({
        nzTitle: 'Generar Orden de Pago',
        nzContent: PaymentOrderDialogContainerComponent,
        nzComponentParams: { data: guaranteeIds },
        nzStyle: { minWidth: '80%' },
        nzOnOk: component => component.submitChild(),
      })
      .afterClose.pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }

  updatePaymentOrder(paymentOrderId: number): void {
    this.paymentOrderCollectionService
      .getByKey(paymentOrderId)
      .pipe(take(1))
      .subscribe(() =>
        this.modal.create({
          nzTitle: 'Editar Orden de Pago',
          nzContent: PaymentOrderDialogContainerComponent,
          nzStyle: { minWidth: '80%' },
          nzOnOk: component => component.submitChild(),
        })
      );
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
    this.guaranteeCollectionService
      .update(guarantee)
      .pipe(take(1))
      .subscribe(() =>
        this.messageService.success(
          `La garantía con folio ${transformFolio(guarantee.id)} ahora está ${statusLabels[
            GuaranteeStatus[GuaranteeStatus[guarantee.status]]
          ].toLowerCase()}`
        )
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
}
