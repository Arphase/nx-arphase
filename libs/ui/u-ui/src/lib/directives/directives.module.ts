import { NgModule } from '@angular/core';

import { IvtInputModule } from './input';
import { IvtLoadingModule } from './loading';
import { IvtUppercaseModule } from './uppercase';

const MODULES = [IvtInputModule, IvtLoadingModule, IvtUppercaseModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtDirectivesModule {}
