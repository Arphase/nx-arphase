import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ApsColumns, ApsValidators } from '@arphase/ui/core';
import { Guarantee, PaymentOrder } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/core';

@Component({
  selector: 'ivt-payment-order-dialog',
  templateUrl: './payment-order-dialog.component.html',
  styleUrls: ['./payment-order-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOrderDialogComponent extends ApsFormComponent<PaymentOrder> implements OnChanges {
  @Input() selectedIds: number[];
  columns: ApsColumns = [
    {
      label: 'Folio',
      colSizes: {
        xs: 12,
        md: 4,
      },
    },
    {
      label: 'Fecha de factura',
      colSizes: {
        xs: 12,
        md: 7,
      },
    },
    {
      label: 'Número de factura',
      colSizes: {
        xs: 12,
        md: 7,
      },
    },
    {
      label: 'Importe',
      colSizes: {
        xs: 12,
        md: 6,
      },
    },
  ];

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
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

    if (changes.item && this.item?.guarantees) {
      this.form.patchValue(this.item);
      this.item.guarantees.forEach(guarantee => this.guaranteesFormArray.push(this.createGuaranteeForm(guarantee)));
    }
  }

  createGuaranteeForm(guarantee: Partial<Guarantee>): FormGroup {
    const formControl = this.fb.group({
      id: guarantee.id,
      invoiceDate: [null, ApsValidators.required],
      invoiceNumber: null,
      amount: [null, ApsValidators.required],
    });

    if (guarantee.amount) {
      formControl.patchValue(guarantee);
    }
    return formControl;
  }
}
