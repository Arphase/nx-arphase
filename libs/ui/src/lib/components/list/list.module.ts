import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtListComponent } from './list.component';

@NgModule({
  declarations: [IvtListComponent],
  imports: [CommonModule],
  exports: [IvtListComponent],
})
export class IvtListModule {}
