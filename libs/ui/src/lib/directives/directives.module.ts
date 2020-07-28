import { NgModule } from '@angular/core';

import { IvtUppercaseModule } from './uppercase/uppercase.module';

const MODULES = [IvtUppercaseModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtDirectivesModule {}
