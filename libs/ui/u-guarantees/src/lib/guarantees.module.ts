import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { PermissionsModule, VehiclesDataModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtEmptyModule,
  IvtEmptyStateModule,
  IvtExpansionPanelModule,
  IvtFolioModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtInputModule,
  IvtRadioFilterModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtSuccessDialogModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { VehicleFormModule } from '@ivt/u-vehicles';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxMaskModule } from 'ngx-mask';

import { GuaranteeFormComponent } from './components/guarantee-form/guarantee-form.component';
import { GuaranteeInvoiceNumberDialogComponent } from './components/guarantee-invoice-number-dialog/guarantee-invoice-number-dialog.component';
import { GuaranteeListComponent } from './components/guarantee-list/guarantee-list.component';
import { GuaranteeRowComponent } from './components/guarantee-row/guarantee-row.component';
import { PaymentOrderDialogComponent } from './components/payment-order-dialog/payment-order-dialog.component';
import { PaymentOrderDownloadDialogComponent } from './components/payment-order-download-dialog/payment-order-download-dialog.component';
import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeInvoiceNumberDialogContainerComponent } from './containers/guarantee-invoice-number-dialog-container/guarantee-invoice-number-dialog-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteeRowContainerComponent } from './containers/guarantee-row-container/guarantee-row-container.component';
import { PaymentOrderDialogContainerComponent } from './containers/payment-order-dialog-container/payment-order-dialog-container.component';
import { GuaranteesRoutingModule } from './guarantees-routing.module';
import { GuaranteesComponent } from './guarantees.component';

@NgModule({
  imports: [
    CommonModule,
    GuaranteesRoutingModule,
    PermissionsModule,
    VehicleFormModule,
    VehiclesDataModule,
    ReactiveFormsModule,
    IvtGoBackTitleModule,
    IvtExpansionPanelModule,
    IvtFormFieldModule,
    IvtInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    IvtAddressFormModule,
    MatDialogModule,
    IvtFolioModule,
    IvtSearchbarModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
    IvtRadioFilterModule,
    IvtEmptyStateModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    MatIconModule,
    IvtRowModule,
    MatCheckboxModule,
    MatMenuModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    MatCardModule,
    NzButtonModule,
    IvtSuccessDialogModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
  ],
  declarations: [
    GuaranteeFormComponent,
    GuaranteeFormContainerComponent,
    GuaranteeListContainerComponent,
    GuaranteeListComponent,
    GuaranteeRowComponent,
    GuaranteeRowContainerComponent,
    GuaranteesComponent,
    PaymentOrderDialogComponent,
    PaymentOrderDialogContainerComponent,
    PaymentOrderDownloadDialogComponent,
    GuaranteeInvoiceNumberDialogContainerComponent,
    GuaranteeInvoiceNumberDialogComponent,
  ],
})
export class GuaranteesModule {}
