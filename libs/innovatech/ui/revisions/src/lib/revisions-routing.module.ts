import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsDirtyFormGuard } from '@arphase/ui/core';
import { UserRoles } from '@innovatech/common/domain';
import { RoleGuard } from '@innovatech/ui/auth/data';

import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionResolverService } from './resolvers/revision-resolver.service';
import { RevisionsComponent } from './revisions.component';

export const routes: Routes = [
  {
    path: '',
    component: RevisionsComponent,
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
        path: ':revisionId',
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
