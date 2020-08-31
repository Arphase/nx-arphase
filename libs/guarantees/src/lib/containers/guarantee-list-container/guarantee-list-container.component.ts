import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee } from '@ivt/data';
import { GuaranteeCollectionService } from '@ivt/state';
import { IvtListContainerComponent } from '@ivt/ui';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { PaymentOrderDialogContainerComponent } from '../payment-order-dialog-container/payment-order-dialog-container.component';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListContainerComponent extends IvtListContainerComponent<Guarantee> {
  clearSelectedSubject = new BehaviorSubject<boolean>(false);
  clearSelected$ = this.clearSelectedSubject.asObservable();

  constructor(protected guaranteeCollectionService: GuaranteeCollectionService, private dialog: MatDialog) {
    super(guaranteeCollectionService);
  }

  openPaymentOrderDialog(guaranteeIds: number[]): void {
    this.dialog
      .open(PaymentOrderDialogContainerComponent, {
        data: guaranteeIds,
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this.clearSelectedSubject.next(true));
  }
}
