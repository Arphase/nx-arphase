import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtListContainerComponent } from './list-container.component';

@NgModule({
  declarations: [IvtListContainerComponent],
  imports: [CommonModule],
  exports: [IvtListContainerComponent],
})
export class IvtListContainerModule {}
