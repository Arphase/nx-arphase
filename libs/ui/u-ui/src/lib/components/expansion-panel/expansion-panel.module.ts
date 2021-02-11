import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  declarations: [IvtExpansionPanelComponent],
  imports: [CommonModule, MatExpansionModule, NzIconModule, NzButtonModule],
  exports: [IvtExpansionPanelComponent],
})
export class IvtExpansionPanelModule {}
