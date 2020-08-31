import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee, GuaranteeStatus } from '@ivt/data';
import { IvtListComponent } from '@ivt/ui';

import { PaymentOrderDialogContainerComponent } from '../../containers/payment-order-dialog-container/payment-order-dialog-container.component';
import {
  columns,
  dateTypeOptions,
  statusOptions,
} from './guarantee-list.constants';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListComponent extends IvtListComponent<Guarantee> {
  @Input() loadingPaymentOrder: boolean;
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() generatePaymentOrder = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {
    super();
  }

  onSelectItem(id: number): void {
    this.selectedIds.toggle(id);
  }

  openDialog(): void {
    this.dialog.open(PaymentOrderDialogContainerComponent, {
      data: this.selectedIds.selected,
    });
  }

  updateStatusFilter(status: GuaranteeStatus): void {
    this.filterItems.emit({ status });
  }
}
