import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtMatButtonLoadingDirective } from './loading.directive';

@NgModule({
  declarations: [IvtMatButtonLoadingDirective],
  imports: [CommonModule],
  exports: [IvtMatButtonLoadingDirective]
})
export class IvtLoadingModule {}
