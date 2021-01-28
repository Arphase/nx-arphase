import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvtDirtyFormGuard } from '@ivt/u-ui';

import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionResolverService } from './resolvers/revision-resolver.service';
import { RevisionsResolverService } from './resolvers/revisions-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: RevisionListContainerComponent,
    resolve: { resolvedProducts: RevisionsResolverService },
  },
  {
    path: 'new',
    component: RevisionFormContainerComponent,
    canDeactivate: [IvtDirtyFormGuard],
    resolve: { resolvedProduct: RevisionResolverService },
  },
  {
    path: ':revisionId',
    component: RevisionFormContainerComponent,
    canDeactivate: [IvtDirtyFormGuard],
    resolve: { resolvedProduct: RevisionResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionsRoutingModule {}
