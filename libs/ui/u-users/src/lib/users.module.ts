import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  IvtCheckboxFilterModule,
  IvtEmptyModule,
  IvtRowModule,
  IvtSearchbarModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserRowComponent } from './components/user-row/user-row.component';
import { UserListContainerComponent } from './containers/user-list-container/user-list-container.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    IvtSearchbarModule,
    MatIconModule,
    IvtCheckboxFilterModule,
    NzEmptyModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    NzButtonModule,
    MatCardModule,
    NzGridModule,
  ],
  declarations: [UserListContainerComponent, UsersComponent, UserListComponent, UserRowComponent],
})
export class UsersModule {}
