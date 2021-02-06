import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PermissionsModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtEmptyModule,
  IvtEmptyStateModule,
  IvtExpansionPanelModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtInputModule,
  IvtLoadingModule,
  IvtPhoneModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtTableHeaderModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
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
    MatIconModule,
    IvtExpansionPanelModule,
    IvtFormFieldModule,
    IvtInputModule,
    IvtAddressFormModule,
    IvtRowModule,
    IvtLoadingModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    IvtEmptyStateModule,
    IvtTableHeaderModule,
    IvtVirtualScrollModule,
    IvtGoBackTitleModule,
    IvtSearchbarModule,
    IvtPhoneModule,
    MatCardModule,
    MatButtonModule,
    NgxMaskModule
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
