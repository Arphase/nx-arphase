import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IvtEmptyStateComponent } from './empty-state.component';

@NgModule({
  declarations: [IvtEmptyStateComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IvtEmptyStateComponent],
})
export class IvtEmptyStateModule {}
