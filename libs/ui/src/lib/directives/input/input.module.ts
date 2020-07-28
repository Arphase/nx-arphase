import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtInputDirective } from './input.directive';

@NgModule({
  declarations: [IvtInputDirective],
  imports: [CommonModule],
  exports: [IvtInputDirective],
})
export class IvtInputModule {}
