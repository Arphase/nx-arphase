import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtVirtualScrollComponent } from './virtual-scroll.component';

@NgModule({
  declarations: [IvtVirtualScrollComponent],
  imports: [CommonModule, ScrollingModule],
  exports: [IvtVirtualScrollComponent],
})
export class IvtVirtualScrollModule {}
