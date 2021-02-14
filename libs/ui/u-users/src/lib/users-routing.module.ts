import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListContainerComponent } from './containers/user-list-container/user-list-container.component';
import { UsersComponent } from './users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UserListContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
