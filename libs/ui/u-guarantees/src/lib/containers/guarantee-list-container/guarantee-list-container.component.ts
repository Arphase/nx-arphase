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
import { take, takeUntil } from 'rxjs/operators';

import { GuaranteeInvoiceNumberDialogContainerComponent } from '../guarantee-invoice-number-dialog-container/guarantee-invoice-number-dialog-container.component';
import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
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
    this.groupCollectionService.clearCache();
    this.companyCollectionService.clearCache();
    this.userCollectionService.clearCache();
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
        nzOnOk: component => component.submitChild(),
      })
      .afterClose.pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }

  downloadPdf(id: number): void {
    this.guaranteeDataService.getGuaranteePdf(id).pipe(take(1)).subscribe();
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

  updatePaymentOrder(paymentOrderId: number): void {
    this.paymentOrderCollectionService
      .getByKey(paymentOrderId)
      .pipe(take(1))
      .subscribe(() =>
        this.modal.create({
          nzTitle: 'Editar Orden de Pago',
          nzContent: PaymentOrderDialogContainerComponent,
          nzOnOk: component => component.submitChild(),
        })
      );
  }

  downloadPaymentOrder(id: number): void {
    this.paymentOrderDataService.getPaymentOrderPdf(id).pipe(take(1)).subscribe();
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
