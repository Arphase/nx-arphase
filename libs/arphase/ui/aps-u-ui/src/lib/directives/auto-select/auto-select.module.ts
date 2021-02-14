import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsAutoSelectDirective } from './auto-select.directive';

@NgModule({
  declarations: [ApsAutoSelectDirective],
  imports: [CommonModule],
  exports: [ApsAutoSelectDirective],
})
export class ApsAutoSelectModule {}
