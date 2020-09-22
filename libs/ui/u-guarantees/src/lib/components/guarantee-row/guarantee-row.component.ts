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
  @Output() changeStatus = new EventEmitter<Partial<Guarantee>>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() openPaymentOrderDialog = new EventEmitter<number>();

  onChangeStatus(id: number, status: GuaranteeStatus): void {
    this.changeStatus.emit({ id, status: GuaranteeStatus[status] });
  }
}
