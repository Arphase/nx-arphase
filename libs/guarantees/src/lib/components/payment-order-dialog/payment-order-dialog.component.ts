import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { IvtFormComponent } from '@ivt/ui';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ivt-payment-order-dialog',
  templateUrl: './payment-order-dialog.component.html',
  styleUrls: ['./payment-order-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentOrderDialogComponent extends IvtFormComponent implements OnChanges {
  @Input() loadingPaymentOrder: boolean;
  @Input() selectedIds: number[];
  @Output() generatePaymentOrder = new EventEmitter<number[]>();
  guaranteesPaymentOrder = new FormArray([]);

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      distributor: [null, Validators.required],
      guarantees: this.fb.array([])
    })
  }

  get guaranteesFormArray(): FormArray {
    return this.form.get('guarantees') as FormArray
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedIds && !!this.selectedIds) {
      this.selectedIds.forEach(id =>
        this.guaranteesFormArray.push(this.createGuaranteeForm(id))
      )
    }
  }

  createGuaranteeForm(id: number) {
    const guarantee = this.fb.group({
      id,
      invoiceDate: [null, Validators.required],
      amount: [null, Validators.required]
    })
    return guarantee
  }
}
