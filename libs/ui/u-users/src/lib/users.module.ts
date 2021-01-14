import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/u-ui';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserListContainerComponent } from './containers/user-list-container/user-list-container.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserRowComponent } from './components/user-row/user-row.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, IvtUiModule],
  declarations: [UserListContainerComponent, UsersComponent, UserListComponent, UserRowComponent],
})
export class UsersModule {}
