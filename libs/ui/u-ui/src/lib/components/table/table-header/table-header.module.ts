import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtTableHeaderColumnModule } from '../table-header-column';
import { IvtTableHeaderComponent } from './table-header.component';

@NgModule({
  declarations: [IvtTableHeaderComponent],
  imports: [CommonModule, IvtTableHeaderColumnModule],
  exports: [IvtTableHeaderComponent],
})
export class IvtTableHeaderModule {}
