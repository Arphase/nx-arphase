import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtTableHeaderColumnComponent } from './table-header-column.component';

@NgModule({
  declarations: [IvtTableHeaderColumnComponent],
  imports: [CommonModule, MatIconModule, NzGridModule],
  exports: [IvtTableHeaderColumnComponent],
})
export class IvtTableHeaderColumnModule {}
