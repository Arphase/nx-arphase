import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtSuccessDialogComponent } from './success-dialog.component';

@NgModule({
  declarations: [IvtSuccessDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, NzButtonModule, NzGridModule],
  exports: [IvtSuccessDialogComponent],
})
export class IvtSuccessDialogModule {}
