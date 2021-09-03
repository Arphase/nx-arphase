import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsCheckboxFilterModule, ApsEmptyModule, ApsFeatureLayoutModule, ApsSearchbarModule } from '@arphase/ui/core';
import { CompanyCheckboxFilterModule } from '@innovatech/ui/companies/ui';
import { GroupCheckboxFilterModule } from '@innovatech/ui/groups/ui';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { UsersDataModule } from '@innovatech/ui/users/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserListContainerComponent } from './containers/user-list-container/user-list-container.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ApsSearchbarModule,
    NzIconModule,
    ApsCheckboxFilterModule,
    NzEmptyModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzTypographyModule,
    NzToolTipModule,
    NzDividerModule,
    NzTableModule,
    PermissionsModule,
    UsersDataModule,
    GroupCheckboxFilterModule,
    CompanyCheckboxFilterModule,
  ],
  declarations: [UserListContainerComponent, UserListComponent],
})
export class UsersModule {}
