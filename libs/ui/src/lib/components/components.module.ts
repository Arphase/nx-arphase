import { NgModule } from '@angular/core';

import { IvtEmptyStateModule } from './empty-state';
import { IvtExpansionPanelModule } from './expansion-panel';
import { IvtFilterModule } from './filters';
import { IvtDateFilterModule } from './filters/date-filter';
import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtSubscriberModule } from './subscriber';
import { IvtTableModule } from './table';
import { IvtVirtualScrollModule } from './virtual-scroll';

const MODULES = [
  IvtDateFilterModule,
  IvtEmptyStateModule,
  IvtExpansionPanelModule,
  IvtFilterModule,
  IvtFormModule,
  IvtFormFieldModule,
  IvtListModule,
  IvtSearchbarModule,
  IvtSubscriberModule,
  IvtTableModule,
  IvtVirtualScrollModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
