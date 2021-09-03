import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { UserListContainerComponent } from './containers/user-list-container/user-list-container.component';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Usuarios' },
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
