import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { Guarantee } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-guarantee-invoice-number-dialog',
  templateUrl: './guarantee-invoice-number-dialog.component.html',
  styleUrls: ['./guarantee-invoice-number-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeInvoiceNumberDialogComponent extends IvtFormComponent<Guarantee> implements OnChanges {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      invoiceNumber: [null, ApsValidators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.form.patchValue(this.item);
    }
  }
}
