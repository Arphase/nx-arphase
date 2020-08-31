import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { PaymentOrder } from '@ivt/data';
import { IvtColumns, IvtFormComponent } from '@ivt/ui';

@Component({
  selector: 'ivt-payment-order-dialog',
  templateUrl: './payment-order-dialog.component.html',
  styleUrls: ['./payment-order-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOrderDialogComponent extends IvtFormComponent<PaymentOrder> implements OnChanges {
  @Input() selectedIds: number[];
  columns: IvtColumns = [
    {
      label: 'Folio',
      prop: 'id',
      sortable: false,
      colSize: 2,
    },
    {
      label: 'Fecha de factura',
      prop: 'invoiceDate',
      sortable: false,
      colSize: 5,
    },
    {
      label: 'Importe',
      prop: 'amount',
      sortable: false,
      colSize: 5,
    },
  ];

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      distributor: [null, Validators.required],
      guarantees: this.fb.array([]),
    });
  }

  get guaranteesFormArray(): FormArray {
    return this.form.get('guarantees') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedIds && !!this.selectedIds) {
      this.selectedIds.forEach(id => this.guaranteesFormArray.push(this.createGuaranteeForm(id)));
    }
  }

  createGuaranteeForm(id: number) {
    const guarantee = this.fb.group({
      id,
      invoiceDate: [null, Validators.required],
      amount: [null, Validators.required],
    });
    return guarantee;
  }
}
