import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IvtTableHeaderColumnComponent } from './table-header-column.component';

@NgModule({
  declarations: [IvtTableHeaderColumnComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IvtTableHeaderColumnComponent],
})
export class IvtTableHeaderColumnModule {}