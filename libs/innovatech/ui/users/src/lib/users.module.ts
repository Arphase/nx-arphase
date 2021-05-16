import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { IvtCheckboxFilterModule, IvtEmptyModule, IvtSearchbarModule } from '@ivt/u-ui';
import { EntityDataService } from '@ngrx/data';
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
import { UserDataService } from './services/user-data.service';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    IvtSearchbarModule,
    NzIconModule,
    IvtCheckboxFilterModule,
    NzEmptyModule,
    IvtEmptyModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzTypographyModule,
    NzToolTipModule,
    NzDividerModule,
    NzTableModule,
    PermissionsModule,
  ],
  declarations: [UserListContainerComponent, UsersComponent, UserListComponent],
})
export class UsersModule {
  constructor(entityDataService: EntityDataService, userDataService: UserDataService) {
    entityDataService.registerService('User', userDataService);
  }
}
