import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtRowComponent } from './row.component';

@NgModule({
  declarations: [IvtRowComponent],
  imports: [CommonModule, NzGridModule],
  exports: [IvtRowComponent],
})
export class IvtRowModule {}
