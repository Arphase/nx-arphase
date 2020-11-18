import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company, GuaranteeStatus, statusLabels } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';
import { Subject, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-company-row',
  templateUrl: './company-row.component.html',
  styleUrls: ['./company-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRowComponent extends IvtRowComponent<Company> {
  @Input() loading: boolean;
  @Input() loadingStatusChange: boolean;
  @Input() loadingPaymentOrder: boolean;
  @Input() isEditable: boolean;
  statusLabels = statusLabels;
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
  @Output() changeStatus = new EventEmitter<Partial<Company>>();
  @Output() downloadPaymentOrder = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number>();
  @Output() updatePaymentOrder = new EventEmitter<number>();
}
