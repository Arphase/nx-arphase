import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteesComponent } from './guarantees.component';
import { GuaranteeResolverService } from './resolvers/guarantee-resolver.service';
import { GuaranteesResolverService } from './resolvers/guarantees-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GuaranteesComponent,
    children: [
      {
        path: '',
        component: GuaranteeListContainerComponent,
        resolve: { resolvedGuarantees: GuaranteesResolverService },
      },
      {
        path: 'new',
        component: GuaranteeFormContainerComponent,
        resolve: { resolvedGuarantee: GuaranteeResolverService },
      },
      {
        path: ':id',
        component: GuaranteeFormContainerComponent,
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
