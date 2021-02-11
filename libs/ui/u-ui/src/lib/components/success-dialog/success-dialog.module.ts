import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtSuccessDialogComponent } from './success-dialog.component';

@NgModule({
  declarations: [IvtSuccessDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, NzGridModule],
  exports: [IvtSuccessDialogComponent],
})
export class IvtSuccessDialogModule {}
