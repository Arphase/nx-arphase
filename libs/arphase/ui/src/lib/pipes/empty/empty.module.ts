import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsEmptyPipe } from './empty.pipe';

@NgModule({
  declarations: [ApsEmptyPipe],
  imports: [CommonModule],
  exports: [ApsEmptyPipe],
})
export class ApsEmptyModule {}
