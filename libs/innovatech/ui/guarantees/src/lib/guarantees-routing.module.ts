import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvtDirtyFormGuard } from '@arphase/ui';

import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteesComponent } from './guarantees.component';
import { GuaranteeResolverService } from './resolvers/guarantee-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GuaranteesComponent,
    children: [
      {
        path: '',
        component: GuaranteeListContainerComponent,
      },
      {
        path: 'new',
        component: GuaranteeFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedGuarantee: GuaranteeResolverService },
      },
      {
        path: ':id',
        component: GuaranteeFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedGuarantee: GuaranteeResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuaranteesRoutingModule {}
