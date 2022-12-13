import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';
import { ApsDirtyFormGuard } from '@arphase/ui/forms';

import { GroupFormContainerComponent } from './containers/group-form-container/group-form-container.component';
import { GroupListContainerComponent } from './containers/group-list-container/group-list-container.component';
import { GroupResolverService } from './resolvers/group-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Grupos' },
    children: [
      {
        path: '',
        component: GroupListContainerComponent,
      },
      {
        path: 'new',
        component: GroupFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedGroup: GroupResolverService },
      },
      {
        path: ':id',
        component: GroupFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
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
