import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Guarantee } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-guarantee-invoice-number-dialog',
  templateUrl: './guarantee-invoice-number-dialog.component.html',
  styleUrls: ['./guarantee-invoice-number-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeInvoiceNumberDialogComponent extends IvtFormComponent<Guarantee> implements OnChanges {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      invoiceNumber: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item) {
      this.form.patchValue(this.item);
    }
  }
}