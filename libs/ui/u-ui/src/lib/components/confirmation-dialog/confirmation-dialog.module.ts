import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatDialogModule } from '@angular/material/dialog';

import { IvtConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  declarations: [IvtConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, NzButtonModule],
  exports: [IvtConfirmationDialogComponent],
})
export class IvtConfirmationDialogModule {}
