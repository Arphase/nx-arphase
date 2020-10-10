import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guarantee, PaymentOrder } from '@ivt/c-data';
import { IvtColumns, IvtFormComponent } from '@ivt/u-ui';

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
      colSizes: {
        xs: '2',
      },
    },
    {
      label: 'Fecha de factura',
      prop: 'invoiceDate',
      sortable: false,
      colSizes: {
        xs: '5',
      },
    },
    {
      label: 'Importe',
      prop: 'amount',
      sortable: false,
      colSizes: {
        xs: '5',
      },
    },
  ];

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      distributor: [null, Validators.required],
      guarantees: this.fb.array([]),
    });
  }

  get guaranteesFormArray(): FormArray {
    return this.form.get('guarantees') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedIds && !!this.selectedIds) {
      this.selectedIds.forEach(id => this.guaranteesFormArray.push(this.createGuaranteeForm({ id })));
    }

    if (changes.item && this.item) {
      this.form.patchValue(this.item);
      this.item.guarantees.forEach(guarantee => this.guaranteesFormArray.push(this.createGuaranteeForm(guarantee)));
    }
  }

  createGuaranteeForm(guarantee: Partial<Guarantee>): FormGroup {
    const formControl = this.fb.group({
      id: guarantee.id,
      invoiceDate: [null, Validators.required],
      amount: [0, Validators.required],
    });

    if (guarantee.amount) {
      formControl.patchValue(guarantee);
    }
    return formControl;
  }
}
