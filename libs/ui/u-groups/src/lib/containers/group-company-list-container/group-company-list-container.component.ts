import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '@ivt/c-data';
import { CompanyCollectionService, CompanyDataService, GroupCollectionService, PaymentOrderCollectionService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

//import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-group-company-list-container',
  templateUrl: './group-company-list-conatiner.component.html',
  styleUrls: ['./group-company-list-conatiner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListContainerComponent extends IvtListContainerComponent<Company> {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();
  //excelFileName = 'Garantías';

  constructor(
    protected companyCollectionService: CompanyCollectionService,
    protected companyDataService: CompanyDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private dialog: MatDialog
  ) {
    super(companyCollectionService, companyDataService);
  }

  /*
  createPaymentOrder(companyIds: number[]): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.dialog
      .open(PaymentOrderDialogContainerComponent, { data: companyIds })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }
  */
}
