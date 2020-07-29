import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GuaranteesStateModule } from '@innovatech/state';
import { IvtUiModule } from '@innovatech/ui';

import { GuaranteeFormComponent } from './components/guarantee-form/guarantee-form.component';
import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteesRoutingModule } from './guarantees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IvtUiModule,
    GuaranteesRoutingModule,
    GuaranteesStateModule,
  ],
  declarations: [GuaranteeFormComponent, GuaranteeFormContainerComponent],
})
export class GuaranteesModule {}
