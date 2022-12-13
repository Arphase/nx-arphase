import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';
import { ApsDirtyFormGuard } from '@arphase/ui/forms';
import { UserRoles } from '@innovatech/common/domain';
import { RoleGuard } from '@innovatech/ui/auth/data';

import { RevisionRequestFormContainerComponent } from './containers/revision-request-form-container/revision-request-form-container.component';
import { RevisionRequestListContainerComponent } from './containers/revision-request-list-container/revision-request-list-container.component';
import { RevisionRequestResolverService } from './resolvers/revision-request-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Solicitudes de Revisión' },
    children: [
      {
        path: '',
        component: RevisionRequestListContainerComponent,
      },
      {
        path: 'new',
        component: RevisionRequestFormContainerComponent,
        canActivate: [RoleGuard],
        data: { roles: [UserRoles.agencyUser] },
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedVehicle: RevisionRequestResolverService },
      },
      {
        path: ':id',
        component: RevisionRequestFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
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
