import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '@ivt/c-data';
import { GroupCollectionService, GroupDataService, PaymentOrderCollectionService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

//import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListContainerComponent extends IvtListContainerComponent<Group> {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();
  excelFileName = 'Garantías';

  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected groupDataService: GroupDataService,
    private paymentOrderCollectionService: PaymentOrderCollectionService,
    private dialog: MatDialog
  ) {
    super(groupCollectionService, groupDataService);
  }

  /*
  createPaymentOrder(groupIds: number[]): void {
    this.paymentOrderCollectionService.removeOneFromCache(null);
    this.dialog
      .open(PaymentOrderDialogContainerComponent, { data: groupIds })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }
  */
}
