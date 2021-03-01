import { NgModule } from '@angular/core';

import { IvtUppercaseModule } from './uppercase';

const MODULES = [IvtUppercaseModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtDirectivesModule {}
