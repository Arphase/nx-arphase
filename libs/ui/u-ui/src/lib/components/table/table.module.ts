import { NgModule } from '@angular/core';

import { IvtTableHeaderModule } from './table-header';
import { IvtTableHeaderColumnModule } from './table-header-column';

@NgModule({
  imports: [IvtTableHeaderModule, IvtTableHeaderColumnModule],
  exports: [IvtTableHeaderModule, IvtTableHeaderColumnModule],
})
export class IvtTableModule {}
