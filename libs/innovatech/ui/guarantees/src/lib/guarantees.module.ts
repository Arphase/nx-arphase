import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ApsAutoErrorModule,
  ApsCheckboxFilterModule,
  ApsDataService,
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsRadioFilterModule,
  ApsSearchbarModule,
  ApsUppercaseModule,
} from '@arphase/ui';
import { IvtAddressFormModule } from '@innovatech/ui/addresses/ui';
import { CompanyCheckboxFilterModule, CompanySelectModule } from '@innovatech/ui/companies/ui';
import { IvtFolioModule } from '@innovatech/ui/core/ui';
import { GroupCheckboxFilterModule } from '@innovatech/ui/groups/ui';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { ProductsDataModule } from '@innovatech/ui/products/data';
import { ProductSelectModule } from '@innovatech/ui/products/ui';
import { UserCheckboxFilterModule } from '@innovatech/ui/users/ui';
import { VehiclesDataModule } from '@innovatech/ui/vehicles/data';
import { VehicleFormModule } from '@innovatech/ui/vehicles/ui';
import { EntityDataService } from '@ngrx/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskModule } from 'ngx-mask';

import { GuaranteeFormComponent } from './components/guarantee-form/guarantee-form.component';
import { GuaranteeListComponent } from './components/guarantee-list/guarantee-list.component';
import { GuaranteeRowDetailsComponent } from './components/guarantee-row-details/guarantee-row-details.component';
import { PaymentOrderDialogComponent } from './components/payment-order-dialog/payment-order-dialog.component';
import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { PaymentOrderDialogContainerComponent } from './containers/payment-order-dialog-container/payment-order-dialog-container.component';
import { GuaranteesRoutingModule } from './guarantees-routing.module';
import { GuaranteesComponent } from './guarantees.component';
import { GuaranteeDataService } from './services/guarantee-data.service';
import { PaymentOrderDataService } from './services/payment-order-data.service';

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
    IvtFolioModule,
    ApsSearchbarModule,
    ApsDateFilterModule,
    ApsCheckboxFilterModule,
    ApsRadioFilterModule,
    NzEmptyModule,
    NzIconModule,
    ApsEmptyModule,
    NzCardModule,
    NzButtonModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    ApsAutoErrorModule,
    NzCheckboxModule,
    FormsModule,
    NzModalModule,
    NzTypographyModule,
    NzToolTipModule,
    NzTableModule,
    NzSpaceModule,
    NzDividerModule,
    NzAlertModule,
    NzTagModule,
    ApsUppercaseModule,
    ProductsDataModule,
    GroupCheckboxFilterModule,
    CompanyCheckboxFilterModule,
    UserCheckboxFilterModule,
    CompanySelectModule,
    ProductSelectModule,
  ],
  declarations: [
    GuaranteeFormComponent,
    GuaranteeFormContainerComponent,
    GuaranteeListContainerComponent,
    GuaranteeListComponent,
    GuaranteesComponent,
    PaymentOrderDialogComponent,
    PaymentOrderDialogContainerComponent,
    GuaranteeRowDetailsComponent,
  ],
})
export class GuaranteesModule {
  constructor(
    entityDataService: EntityDataService,
    guaranteeDataService: GuaranteeDataService,
    paymentOrderDataService: PaymentOrderDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      Guarantee: guaranteeDataService,
      PaymentOrder: paymentOrderDataService,
    };
    entityDataService.registerServices(services);
  }
}
