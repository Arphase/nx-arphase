import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Guarantee, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  getAuthUserRoleState,
  GroupCollectionService,
  GuaranteeCollectionService,
  GuaranteeDataService,
  IvtState,
  PaymentOrderCollectionService,
  UserCollectionService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

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
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService
  ) {
    super(guaranteeCollectionService, guaranteeDataService, modal);
  }

  ngOnInit(): void {
    this.groupCollectionService.clearCache();
    this.companyCollectionService.clearCache();
    this.userCollectionService.clearCache();
    this.store.pipe(select(getAuthUserRoleState), filterNil(), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.companyCollectionService.getAll();
        this.groupCollectionService.getAll();
        this.userCollectionService.getAll();
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
}
