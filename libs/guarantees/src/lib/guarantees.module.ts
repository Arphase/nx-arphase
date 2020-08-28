import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/ui';

import { GuaranteeFormComponent } from './components/guarantee-form/guarantee-form.component';
import { GuaranteeListComponent } from './components/guarantee-list/guarantee-list.component';
import { GuaranteeRowComponent } from './components/guarantee-row/guarantee-row.component';
import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteeRowContainerComponent } from './containers/guarantee-row-container/guarantee-row-container.component';
import { GuaranteesRoutingModule } from './guarantees-routing.module';
import { GuaranteesComponent } from './guarantees/guarantees.component';
import { PaymentOrderDialogComponent } from './components/payment-order-dialog/payment-order-dialog.component';

@NgModule({
  imports: [CommonModule, IvtUiModule, GuaranteesRoutingModule],
  declarations: [
    GuaranteeFormComponent,
    GuaranteeFormContainerComponent,
    GuaranteeListContainerComponent,
    GuaranteeListComponent,
    GuaranteeRowComponent,
    GuaranteeRowContainerComponent,
    GuaranteesComponent,
    PaymentOrderDialogComponent,
  ],
})
export class GuaranteesModule {}
