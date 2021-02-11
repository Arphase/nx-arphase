import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtTextTruncateTooltipModule } from '../../text-truncate-tooltip';
import { IvtCheckboxFilterComponent } from './checkbox-filter.component';

@NgModule({
  declarations: [IvtCheckboxFilterComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    ScrollingModule,
    MatCheckboxModule,
    IvtTextTruncateTooltipModule,
    NzGridModule,
  ],
  exports: [IvtCheckboxFilterComponent],
})
export class IvtCheckboxFilterModule {}
