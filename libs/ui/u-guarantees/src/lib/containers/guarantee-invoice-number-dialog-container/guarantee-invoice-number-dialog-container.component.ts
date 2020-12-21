import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Guarantee } from '@ivt/c-data';
import { GuaranteeCollectionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-guarantee-invoice-number-dialog-container',
  templateUrl: './guarantee-invoice-number-dialog-container.component.html',
  styleUrls: ['./guarantee-invoice-number-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeInvoiceNumberDialogContainerComponent extends IvtFormContainerComponent<Guarantee> {
  constructor(
    protected guaranteeCollectiionService: GuaranteeCollectionService,
    @Inject(MAT_DIALOG_DATA) public guarantee: Guarantee
  ) {
    super(guaranteeCollectiionService);
  }
}
