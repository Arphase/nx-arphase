import { NgModule } from '@angular/core';

import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field';
import { IvtListModule } from './list';
import { IvtSearchbarModule } from './searchbar';
import { IvtSubscriberModule } from './subscriber';

const MODULES = [
  IvtFormModule,
  IvtFormFieldModule,
  IvtListModule,
  IvtSearchbarModule,
  IvtSubscriberModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
