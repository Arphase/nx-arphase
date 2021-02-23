import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui';
import { PermissionsModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtEmptyModule,
  IvtPhoneModule,
  IvtSearchbarModule,
  IvtUppercaseModule,
} from '@ivt/u-ui';
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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxMaskModule } from 'ngx-mask';

import { CompanyFormDialogComponent } from './components/company-form-dialog/company-form-dialog.component';
import { GroupCompanyListComponent } from './components/group-company-list/group-company-list.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { GroupListComponent } from './components/group-list/group-list.component';
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
    NzIconModule,
    IvtAddressFormModule,
    IvtEmptyModule,
    NzEmptyModule,
    NzPageHeaderModule,
    IvtSearchbarModule,
    IvtPhoneModule,
    NzCardModule,
    NzButtonModule,
    NgxMaskModule,
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
    IvtUppercaseModule,
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
    GroupCompanyListContainerComponent,
  ],
  entryComponents: [CompanyFormDialogComponent],
})
export class GroupsModule {}
