import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { IvtExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  declarations: [IvtExpansionPanelComponent],
  imports: [CommonModule, MatExpansionModule, MatIconModule, MatButtonModule],
  exports: [IvtExpansionPanelComponent],
})
export class IvtExpansionPanelModule {}
