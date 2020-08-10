import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { IvtConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  declarations: [IvtConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [IvtConfirmationDialogComponent],
})
export class IvtConfirmationDialogModule {}
