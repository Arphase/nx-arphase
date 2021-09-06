import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaComponent } from './spa.component';

const routes: Routes = [
  {
    path: '',
    component: SpaComponent,
    children: [
      {
        path: 'categories',
        loadChildren: () => import('@musicr/ui/categories/feature').then(m => m.CategoriesModule),
      },
      {
        path: 'subcategories',
        loadChildren: () => import('@musicr/ui/subcategories/feature').then(m => m.SubcategoriesModule),
      },
      {
        path: 'products',
        loadChildren: () => import('@musicr/ui/admin-products').then(m => m.AdminProductsModule),
      },
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaRoutingModule {}
