import { NgModule } from '@angular/core';

import { IvtEmptyStateModule } from './empty-state';
import { IvtFilterModule } from './filters';
import { IvtDateFilterModule } from './filters/date-filter';
import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtSubscriberModule } from './subscriber';

const MODULES = [
  IvtEmptyStateModule,
  IvtFormModule,
  IvtFormFieldModule,
  IvtListModule,
  IvtSearchbarModule,
  IvtSubscriberModule,
  IvtFilterModule,
  IvtDateFilterModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
