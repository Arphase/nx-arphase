import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupFormsContainerComponent } from './containers/group-forms-container/group-forms-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupsComponent } from './groups.component';
import { GroupResolverService } from './resolvers/group-resolver.service';
import { GroupsResolverService } from './resolvers/groups-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    children: [
      {
        path: '',
        component: GroupListContainerComponent,
        resolve: { resolvedGroups: GroupsResolverService },
      },
      {
        path: 'new',
        component: GroupFormsContainerComponent,
        resolve: { resolvedGroup: GroupResolverService },
      },
      {
        path: ':id',
        component: GroupFormsContainerComponent,
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
