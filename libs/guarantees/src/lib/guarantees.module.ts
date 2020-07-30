import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GuaranteesStateModule } from '@ivt/state';
import { IvtUiModule } from '@ivt/ui';

import { GuaranteeFormComponent } from './components/guarantee-form/guarantee-form.component';
import { GuaranteeListComponent } from './components/guarantee-list/guarantee-list.component';
import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteesRoutingModule } from './guarantees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IvtUiModule,
    GuaranteesRoutingModule,
    GuaranteesStateModule,
  ],
  declarations: [
    GuaranteeFormComponent,
    GuaranteeFormContainerComponent,
    GuaranteeListContainerComponent,
    GuaranteeListComponent,
  ],
})
export class GuaranteesModule {}
