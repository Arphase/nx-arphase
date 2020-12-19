import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ivt-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtSuccessDialogComponent {
  @Input() successMessage: string;
}
