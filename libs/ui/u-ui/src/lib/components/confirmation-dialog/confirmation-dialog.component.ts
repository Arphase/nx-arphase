import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IvtConfirmationDialogComponentData {
  message: string;
}

@Component({
  selector: 'ivt-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IvtConfirmationDialogComponentData) {}
}
