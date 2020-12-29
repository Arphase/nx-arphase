import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionsModule } from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';

import { CompanyRowComponent } from './components/company-row/company-row.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { CompanyFormDialogComponent } from './components/company-form-dialog/company-form-dialog.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { GroupFormContainerComponent } from './containers/group-form-container/group-form-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { GroupCompanyListContainerComponent } from './containers/group-company-list-container/group-company-list-container.component';

@NgModule({
  imports: [CommonModule, IvtUiModule, GroupsRoutingModule, PermissionsModule],
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
