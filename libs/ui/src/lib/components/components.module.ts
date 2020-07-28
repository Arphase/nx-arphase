import { NgModule } from '@angular/core';

import { IvtFormModule } from './form';
import { IvtListModule } from './list';
import { IvtSubscriberModule } from './subscriber';

const MODULES = [IvtFormModule, IvtListModule, IvtSubscriberModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
