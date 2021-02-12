import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Guarantee } from '@ivt/c-data';
import { GuaranteeCollectionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ivt-guarantee-invoice-number-dialog-container',
  templateUrl: './guarantee-invoice-number-dialog-container.component.html',
  styleUrls: ['./guarantee-invoice-number-dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeInvoiceNumberDialogContainerComponent extends IvtFormContainerComponent<Guarantee> {
  updateSuccessMessage = 'El número de factura se ha actualizado con éxito';
  @Input() guarantee: Guarantee;

  constructor(
    protected guaranteeCollectiionService: GuaranteeCollectionService,
    protected messageService: NzMessageService,
    protected modalRef: NzModalRef
  ) {
    super(guaranteeCollectiionService, null, messageService, modalRef);
  }
}
