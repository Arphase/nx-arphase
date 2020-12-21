import { NgModule } from '@angular/core';

import { IvtEmptyModule } from './empty';
import { IvtFolioModule } from './folio';
import { IvtPhoneModule } from './phone';

const MODULES = [IvtEmptyModule, IvtFolioModule, IvtPhoneModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class IvtPipesModule {}
