import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtRowComponent } from './row.component';

@NgModule({
  declarations: [IvtRowComponent],
  imports: [CommonModule],
  exports: [IvtRowComponent],
})
export class IvtRowModule {}
