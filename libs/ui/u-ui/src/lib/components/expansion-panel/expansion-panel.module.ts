import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { IvtExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  declarations: [IvtExpansionPanelComponent],
  imports: [CommonModule, MatExpansionModule, MatIconModule, NzButtonModule],
  exports: [IvtExpansionPanelComponent],
})
export class IvtExpansionPanelModule {}
