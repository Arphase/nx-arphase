import { NgModule } from '@angular/core';

import { IvtFormModule } from './form';
import { IvtFormFieldModule } from './form-field/form-field.module';
import { IvtListModule } from './list';
import { IvtSubscriberModule } from './subscriber';

const MODULES = [
  IvtFormModule,
  IvtFormFieldModule,
  IvtListModule,
  IvtSubscriberModule,
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
