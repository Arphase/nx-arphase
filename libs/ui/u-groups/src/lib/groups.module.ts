import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsModule } from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';
import { NgbActiveModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupFormsContainerComponent } from './containers/group-forms-container/group-forms-container.component';
import { GroupsTabContainerComponent } from './containers/groups-tab-container/groups-tab-container.component';
import { GroupFormsComponent } from './components/group-forms/group-forms.component';
import { CompanyFormDialogComponent } from './components/group-form-companies/group-form-companies.component';
import { GroupFormUsersComponent } from './components/group-form-users/group-form-users.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { CompanyRowComponent } from './components/company-row/company-row.component';
import { GroupRowContainerComponent } from './containers/group-row-container/group-row-container.component';
import { GroupRowComponent } from './components/group-row/group-row.component';
import { CompanyRowContainerComponent } from './containers/company-row-container/company-row-container.component';


@NgModule({
  imports: [CommonModule, IvtUiModule, GroupsRoutingModule, PermissionsModule, NgbModule],
  declarations: [GroupsComponent, GroupCompanyListComponent, GroupListComponent, GroupListContainerComponent, GroupFormsContainerComponent, GroupsTabContainerComponent, GroupFormsComponent, CompanyFormDialogComponent, GroupFormUsersComponent, CompanyRowComponent, GroupRowContainerComponent, GroupRowComponent, CompanyRowContainerComponent],
  entryComponents: [CompanyFormDialogComponent],
})
export class GroupsModule {}
