import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsAutoErrorDirective } from './auto-error.directive';

@NgModule({
  declarations: [ApsAutoErrorDirective],
  imports: [CommonModule],
  exports: [ApsAutoErrorDirective],
})
export class ApsAutoErrorModule {}
