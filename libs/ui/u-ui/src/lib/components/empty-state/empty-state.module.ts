import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtEmptyStateComponent } from './empty-state.component';

@NgModule({
  declarations: [IvtEmptyStateComponent],
  imports: [CommonModule, MatIconModule, NzGridModule],
  exports: [IvtEmptyStateComponent],
})
export class IvtEmptyStateModule {}
