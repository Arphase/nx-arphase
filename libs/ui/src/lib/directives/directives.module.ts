import { NgModule } from '@angular/core';

import { IvtInputModule } from './input/input.module';
import { IvtUppercaseModule } from './uppercase/uppercase.module';

const MODULES = [IvtInputModule, IvtUppercaseModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtDirectivesModule {}
