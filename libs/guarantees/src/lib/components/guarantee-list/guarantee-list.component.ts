import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { Guarantee } from '@ivt/data';
import { IvtListComponent } from '@ivt/ui';

import { columns, dateTypeOptions } from './guarantee-list.constants';
import { MatDialog } from '@angular/material/dialog';
import { PaymentOrderDialogComponent } from '../payment-order-dialog/payment-order-dialog.component';

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
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() generatePaymentOrder = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog){
    super();
  }

  onSelectItem(id: number): void {
    this.selectedIds.toggle(id);
  }

  openDialog() {
    let dialogRef = this.dialog.open(PaymentOrderDialogComponent);
    let instance = dialogRef.componentInstance;
    instance.selectedIds = this.selectedIds.selected;
  }
}
