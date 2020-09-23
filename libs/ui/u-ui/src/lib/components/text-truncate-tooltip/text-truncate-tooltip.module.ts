import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IvtTextTruncateTooltipComponent } from './text-truncate-tooltip.component';

@NgModule({
  declarations: [IvtTextTruncateTooltipComponent],
  imports: [CommonModule, MatTooltipModule],
  exports: [IvtTextTruncateTooltipComponent]
})
export class IvtTextTruncateTooltipModule {}
