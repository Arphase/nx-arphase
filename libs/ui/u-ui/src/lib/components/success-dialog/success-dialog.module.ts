import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtSuccessDialogComponent } from './success-dialog.component';

@NgModule({
  declarations: [IvtSuccessDialogComponent],
  imports: [CommonModule, MatDialogModule, NzIconModule, NzButtonModule, NzGridModule],
  exports: [IvtSuccessDialogComponent],
})
export class IvtSuccessDialogModule {}
