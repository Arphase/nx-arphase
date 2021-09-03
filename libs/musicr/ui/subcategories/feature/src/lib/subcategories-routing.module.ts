import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { SubcategoryFormContainerComponent } from './containers/subcategory-form-container/subcategory-form-container.component';
import { SubcategoryListContainerComponent } from './containers/subcategory-list-container/subcategory-list-container.component';
import { SubcategoryResolverService } from './resolvers/subcategory-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Subcategorías' },
    children: [
      {
        path: '',
        component: SubcategoryListContainerComponent,
      },
      {
        path: 'new',
        component: SubcategoryFormContainerComponent,
        resolve: { resolvedCategory: SubcategoryResolverService },
      },
      {
        path: ':id',
        component: SubcategoryFormContainerComponent,
        resolve: { resolvedCategory: SubcategoryResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcategoriesRoutingModule {}
