import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuaranteeFormContainerComponent } from './containers/guarantee-form-container/guarantee-form-container.component';
import { GuaranteeListContainerComponent } from './containers/guarantee-list-container/guarantee-list-container.component';
import { GuaranteesResolverService } from './resolvers/guarantees-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: GuaranteeListContainerComponent,
    resolve: { resolvedGuarantees: GuaranteesResolverService },
  },
  {
    path: 'new',
    component: GuaranteeFormContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuaranteesRoutingModule {}
