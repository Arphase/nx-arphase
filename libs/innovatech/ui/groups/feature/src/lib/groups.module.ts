import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAddressFormModule } from '@arphase/ui/addresses';
import {
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsPhoneModule,
  ApsSearchbarModule,
  ApsUppercaseModule,
} from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { GroupsDataModule } from '@innovatech/ui/groups/data';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { ProductsDataModule } from '@innovatech/ui/products/data';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskDirective } from 'ngx-mask';

import { AssignProductsModalComponent } from './components/assign-products-modal/assign-products-modal.component';
import { CompanyFormDialogComponent } from './components/company-form-dialog/company-form-dialog.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AssignProductsModalContainerComponent } from './containers/assign-products-modal-container/assign-products-modal-container.component';
import { GroupCompanyListContainerComponent } from './containers/group-company-list-container/group-company-list-container.component';
import { GroupFormContainerComponent } from './containers/group-form-container/group-form-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule,
    PermissionsModule,
    ReactiveFormsModule,
    NzIconModule,
    ApsAddressFormModule,
    ApsEmptyModule,
    NzEmptyModule,
    NzPageHeaderModule,
    ApsSearchbarModule,
    ApsPhoneModule,
    ApsFeatureLayoutModule,
    NzCardModule,
    NzButtonModule,
    NgxMaskDirective,
    NzGridModule,
    NzMessageModule,
    NzCollapseModule,
    NzFormModule,
    NzInputModule,
    ApsAutoErrorModule,
    NzModalModule,
    NzTypographyModule,
    NzToolTipModule,
    NzSpaceModule,
    NzDividerModule,
    NzTableModule,
    ApsUppercaseModule,
    NzTransferModule,
    NzAlertModule,
    NzSpinModule,
    ProductsDataModule,
    GroupsDataModule,
  ],
  declarations: [
    GroupCompanyListComponent,
    GroupListComponent,
    GroupListContainerComponent,
    GroupFormContainerComponent,
    GroupFormComponent,
    CompanyFormDialogComponent,
    UserFormComponent,
    GroupCompanyListContainerComponent,
    AssignProductsModalContainerComponent,
    AssignProductsModalComponent,
  ],
})
export class GroupsModule {}
