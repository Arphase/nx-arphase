import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { IvtComponentsModule } from './components/components.module';
import { IvtContainersModule } from './containers/containers.module';
import { IvtDirectivesModule } from './directives/directives.module';
import { IvtPipesModule } from './pipes';

const MODULES = [IvtComponentsModule, IvtContainersModule, IvtDirectivesModule, IvtPipesModule];

const THIRD_PARTY_MODULES = [NgxMaskModule];

@NgModule({
  imports: [MODULES, THIRD_PARTY_MODULES],
  exports: [MODULES, THIRD_PARTY_MODULES],
})
export class IvtUiModule {}
