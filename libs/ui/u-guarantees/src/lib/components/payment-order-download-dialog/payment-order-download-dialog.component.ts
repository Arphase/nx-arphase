import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentOrder } from '@ivt/c-data';

@Component({
  selector: 'ivt-payment-order-download-dialog',
  templateUrl: './payment-order-download-dialog.component.html',
  styleUrls: ['./payment-order-download-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentOrderDownloadDialogComponent {
  @Input() loading: boolean;
  @Input() item: PaymentOrder;
  @Output() downloadPdf = new EventEmitter<number>();
}
