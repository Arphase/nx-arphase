import { NgModule } from '@angular/core';

import { IvtFormContainerModule } from './form-container';
import { IvtListContainerModule } from './list-container';

const MODULES = [IvtFormContainerModule, IvtListContainerModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtContainersModule {}
