import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { CategoryFormContainerComponent } from './containers/category-form-container/category-form-container.component';
import { CategoryListContainerComponent } from './containers/category-list-container/category-list-container.component';
import { CategoryResolverService } from './resolvers/category-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Categorías' },
    children: [
      {
        path: '',
        component: CategoryListContainerComponent,
      },
      {
        path: 'new',
        component: CategoryFormContainerComponent,
        resolve: { resolvedCategory: CategoryResolverService },
      },
      {
        path: ':id',
        component: CategoryFormContainerComponent,
        resolve: { resolvedCategory: CategoryResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
