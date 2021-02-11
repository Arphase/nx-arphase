import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PermissionsModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtEmptyModule,
  IvtExpansionPanelModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtInputModule,
  IvtPhoneModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtTableHeaderModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxMaskModule } from 'ngx-mask';

import { CompanyFormDialogComponent } from './components/company-form-dialog/company-form-dialog.component';
import { CompanyRowComponent } from './components/company-row/company-row.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GroupCompanyListContainerComponent } from './containers/group-company-list-container/group-company-list-container.component';
import { GroupFormContainerComponent } from './containers/group-form-container/group-form-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule,
    PermissionsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NzIconModule,
    IvtExpansionPanelModule,
    IvtFormFieldModule,
    IvtInputModule,
    IvtAddressFormModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    NzEmptyModule,
    IvtTableHeaderModule,
    IvtVirtualScrollModule,
    IvtGoBackTitleModule,
    IvtSearchbarModule,
    IvtPhoneModule,
    NzCardModule,
    NzButtonModule,
    NgxMaskModule,
    NzGridModule,
    NzMessageModule,
  ],
  declarations: [
    GroupsComponent,
    GroupCompanyListComponent,
    GroupListComponent,
    GroupListContainerComponent,
    GroupFormContainerComponent,
    GroupFormComponent,
    CompanyFormDialogComponent,
    UserFormComponent,
    CompanyRowComponent,
    GroupRowComponent,
    GroupCompanyListContainerComponent,
  ],
  entryComponents: [CompanyFormDialogComponent],
})
export class GroupsModule {}
