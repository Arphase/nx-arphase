import { NgModule } from '@angular/core';

import { IvtEmptyModule } from './empty';
import { IvtFolioModule } from './folio';

const MODULES = [IvtEmptyModule, IvtFolioModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtPipesModule {}
