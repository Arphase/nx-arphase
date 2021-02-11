import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ApsAutoErrorModule } from '@arphase/ui';
import { PermissionsModule, VehiclesDataModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtEmptyModule,
  IvtFolioModule,
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
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
    NzPageHeaderModule,
    NzCollapseModule,
    IvtAddressFormModule,
    MatDialogModule,
    IvtFolioModule,
    IvtSearchbarModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
    IvtRadioFilterModule,
    NzEmptyModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    NzIconModule,
    IvtRowModule,
    MatCheckboxModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    NzCardModule,
    NzButtonModule,
    IvtSuccessDialogModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    ApsAutoErrorModule
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
