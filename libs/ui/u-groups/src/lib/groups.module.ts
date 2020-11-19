import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionsModule } from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';

import { CompanyRowComponent } from './components/company-row/company-row.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { CompanyFormDialogComponent } from './components/group-form-companies/group-form-companies.component';
import { GroupFormUsersComponent } from './components/group-form-users/group-form-users.component';
import { GroupFormsComponent } from './components/group-forms/group-forms.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { GroupFormsContainerComponent } from './containers/group-forms-container/group-forms-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  imports: [CommonModule, IvtUiModule, GroupsRoutingModule, PermissionsModule],
  declarations: [
    GroupsComponent,
    GroupCompanyListComponent,
    GroupListComponent,
    GroupListContainerComponent,
    GroupFormsContainerComponent,
    GroupFormsComponent,
    CompanyFormDialogComponent,
    GroupFormUsersComponent,
    CompanyRowComponent,
    GroupRowComponent,
  ],
  entryComponents: [CompanyFormDialogComponent],
})
export class GroupsModule {}
