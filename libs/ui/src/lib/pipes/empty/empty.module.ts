import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtEmptyPipe } from './empty.pipe';

@NgModule({
  declarations: [IvtEmptyPipe],
  imports: [CommonModule],
  exports: [IvtEmptyPipe],
})
export class IvtEmptyModule {}
