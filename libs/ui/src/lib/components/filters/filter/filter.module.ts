import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtFilterComponent } from './filter.component';

@NgModule({
  declarations: [IvtFilterComponent],
  imports: [CommonModule],
  exports: [IvtFilterComponent],
})
export class IvtFilterModule {}
