import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';
import { ApsDirtyFormGuard } from '@arphase/ui/forms';
import { UserRoles } from '@innovatech/common/domain';
import { RoleGuard } from '@innovatech/ui/auth/data';

import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionResolverService } from './resolvers/revision-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Revisiones' },
    children: [
      {
        path: '',
        component: RevisionListContainerComponent,
      },
      {
        path: 'new',
        component: RevisionFormContainerComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserRoles.superAdmin, UserRoles.repairman],
        },
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedRevision: RevisionResolverService },
      },
      {
        path: ':id',
        component: RevisionFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedRevision: RevisionResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionsRoutingModule {}
