import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { IvtListContainerComponent } from './list-container.component';

@NgModule({
  declarations: [IvtListContainerComponent],
  imports: [CommonModule, NzModalModule],
  exports: [IvtListContainerComponent],
})
export class IvtListContainerModule {}
