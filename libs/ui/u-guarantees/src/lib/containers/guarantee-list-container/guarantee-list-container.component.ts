import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee, UserRoles } from '@ivt/c-data';
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
  companiesOptions$ = this.companyCollectionService.options$;

  constructor(
    protected guaranteeCollectionService: GuaranteeCollectionService,
    protected guaranteeDataService: GuaranteeDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private dialog: MatDialog,
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService
  ) {
    super(guaranteeCollectionService, guaranteeDataService);
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthUserRoleState), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupCollectionService.getAll();
      }
    });
  }

  createPaymentOrder(guaranteeIds: number[]): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.dialog
      .open(PaymentOrderDialogContainerComponent, { data: guaranteeIds })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }

  filterCompanies(groupIds: number[]): void {
    this.companyCollectionService.getWithQuery({ groupIds: groupIds.toString() });
  }

  filterUsers(companyIds: number[]): void {
    this.userCollectionService.getWithQuery({ companyIds: companyIds.toString() });
  }
}
