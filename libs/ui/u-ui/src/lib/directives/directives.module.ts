import { NgModule } from '@angular/core';

import { IvtInputModule } from './input';
import { IvtUppercaseModule } from './uppercase';

const MODULES = [IvtInputModule, IvtUppercaseModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtDirectivesModule {}
