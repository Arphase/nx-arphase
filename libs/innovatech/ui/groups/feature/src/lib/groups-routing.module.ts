import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvtDirtyFormGuard } from '@ivt/u-ui';

import { GroupFormContainerComponent } from './containers/group-form-container/group-form-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsComponent } from './groups.component';
import { GroupResolverService } from './resolvers/group-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: '',
        component: GroupListContainerComponent,
      },
      {
        path: 'new',
        component: GroupFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedGroup: GroupResolverService },
      },
      {
        path: ':id',
        component: GroupFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedGroup: GroupResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}