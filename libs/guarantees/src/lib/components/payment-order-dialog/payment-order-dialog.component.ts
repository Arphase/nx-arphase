import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { IvtFormComponent } from '@ivt/ui';

@Component({
  selector: 'ivt-payment-order-dialog',
  templateUrl: './payment-order-dialog.component.html',
  styleUrls: ['./payment-order-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOrderDialogComponent extends IvtFormComponent {
  @Input() loadingPaymentOrder: boolean;
  @Input() selectedIds;
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() generatePaymentOrder = new EventEmitter<number[]>();
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      distributor: [null, Validators.required],
      invoiceDate: [null, Validators.required],
      amount: [null, Validators.required]
    })
  }
}
