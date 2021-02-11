import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtTableHeaderColumnComponent } from './table-header-column.component';

@NgModule({
  declarations: [IvtTableHeaderColumnComponent],
  imports: [CommonModule, NzIconModule, NzGridModule],
  exports: [IvtTableHeaderColumnComponent],
})
export class IvtTableHeaderColumnModule {}
