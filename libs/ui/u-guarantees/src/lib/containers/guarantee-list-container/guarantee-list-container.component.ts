import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Guarantee, GuaranteeStatus, statusLabels, transformFolio, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  getAuthUserRoleState,
  GroupCollectionService,
  GuaranteeCollectionService,
  GuaranteeDataService,
  IvtState,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
  UserCollectionService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';

import { GuaranteeInvoiceNumberDialogContainerComponent } from '../guarantee-invoice-number-dialog-container/guarantee-invoice-number-dialog-container.component';
import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<Guarantee> implements OnInit {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();
  excelFileName = 'Garantias';
  groupOptions$ = this.groupCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  userOptions$ = this.userCollectionService.options$;

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected guaranteeDataService: GuaranteeDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService,
    private paymentOrderDataService: PaymentOrderDataService
  ) {
    super(guaranteeCollectionService, guaranteeDataService, modal, messageService);
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthUserRoleState), filterNil(), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.companyCollectionService.getWithQuery({});
        this.groupCollectionService.getWithQuery({});
        this.userCollectionService.getWithQuery({});
      }
    });
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

  editInvoiceNumber(guarantee: Guarantee): void {
    this.modal.create({
      nzTitle: `Número de factura - Garantía ${transformFolio(guarantee.id)}`,
      nzContent: GuaranteeInvoiceNumberDialogContainerComponent,
      nzOnOk: component => component.submitChild(),
      nzComponentParams: { guarantee },
    });
  }
}
