import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtUppercaseDirective } from './uppercase.directive';

@NgModule({
  declarations: [IvtUppercaseDirective],
  imports: [CommonModule],
  exports: [IvtUppercaseDirective],
})
export class IvtUppercaseModule {}
