import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from '@ivt/c-data';
import { IvtDirtyFormGuard, RoleGuard } from '@ivt/u-ui';

import { RevisionRequestFormContainerComponent } from './containers/revision-request-form-container/revision-request-form-container.component';
import { RevisionRequestListContainerComponent } from './containers/revision-request-list-container/revision-request-list-container.component';
import { RevisionRequestResolverService } from './resolvers/revision-request-resolver.service';
import { RevisionRequestsComponent } from './revision-requests.component';

export const routes: Routes = [
  {
    path: '',
    component: RevisionRequestsComponent,
    children: [
      {
        path: '',
        component: RevisionRequestListContainerComponent,
      },
      {
        path: 'new',
        component: RevisionRequestFormContainerComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserRoles.agencyUser],
        },
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedVehicle: RevisionRequestResolverService },
      },
      {
        path: ':id',
        component: RevisionRequestFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedVehicle: RevisionRequestResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionRequestsRoutingModule {}
