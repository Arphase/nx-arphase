import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Guarantee, GuaranteeStatus, statusLabels } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';
import { Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { backgroundClasses, menuOptions } from './guarantee-row.constants';

@Component({
  selector: 'ivt-guarantee-row',
  templateUrl: './guarantee-row.component.html',
  styleUrls: ['./guarantee-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowComponent extends IvtRowComponent<Guarantee> {
  @Input() loading: boolean;
  @Input() loadingStatusChange: boolean;
  @Input() loadingPaymentOrder: boolean;
  @Input() isEditable: boolean;
  statusLabels = statusLabels;
  backgroundClasses = backgroundClasses;
  guaranteeStatus = GuaranteeStatus;
  menuOptions = menuOptions;
  showStatusSubject = new Subject();
  showStatus$ = this.showStatusSubject.asObservable();
  visibleStatus$ = this.showStatus$.pipe(
    switchMap(() =>
      timer(0, 1000).pipe(
        take(2),
        map(x => x % 2 === 0)
      )
    )
  );
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number>();
  @Output() updatePaymentOrder = new EventEmitter<number>();
  @Output() editInvoiceNumber = new EventEmitter<Guarantee>();

  onChangeStatus(id: number, status: GuaranteeStatus): void {
    this.edit.emit({ id, status: GuaranteeStatus[status] });
  }
}
