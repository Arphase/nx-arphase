import { NgModule } from '@angular/core';

import { IvtFormModule } from './form';
import { IvtListModule } from './list';

const MODULES = [IvtFormModule, IvtListModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtComponentsModule {}
