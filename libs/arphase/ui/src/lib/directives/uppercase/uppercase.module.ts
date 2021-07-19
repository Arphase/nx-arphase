import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsUppercaseDirective } from './uppercase.directive';

@NgModule({
  declarations: [ApsUppercaseDirective],
  imports: [CommonModule],
  exports: [ApsUppercaseDirective],
})
export class ApsUppercaseModule {}
