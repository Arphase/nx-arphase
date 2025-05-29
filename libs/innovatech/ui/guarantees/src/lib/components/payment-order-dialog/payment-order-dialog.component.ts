import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ApsColumns } from '@arphase/ui/core';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';
import { Guarantee, PaymentOrder } from '@innovatech/common/domain';

@Component({
  selector: 'ivt-payment-order-dialog',
  templateUrl: './payment-order-dialog.component.html',
  styleUrls: ['./payment-order-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PaymentOrderDialogComponent extends ApsFormComponent<PaymentOrder, PaymentOrder> implements OnChanges {
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

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      guarantees: this.fb.array([]),
    });
  }

  get guaranteesFormArray(): UntypedFormArray {
    return this.form.get('guarantees') as UntypedFormArray;
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

  createGuaranteeForm(guarantee: Partial<Guarantee>): UntypedFormGroup {
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
