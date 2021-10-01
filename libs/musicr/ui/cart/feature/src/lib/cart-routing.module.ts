import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart.component';
import { CartTabContainerComponent } from './containers/cart-tab-container/cart-tab-container.component';
import { ConfirmationContainerComponent } from './containers/confirmation-container/confirmation-container.component';
import { PersonalDataFormContainerComponent } from './containers/personal-data-form-container/personal-data-form-container.component';
import { SocialEventFormContainerComponent } from './containers/social-event-form-container/social-event-form-container.component';

export const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    children: [
      {
        path: 'products',
        component: CartTabContainerComponent,
      },
      {
        path: 'social-event',
        component: SocialEventFormContainerComponent,
      },
      {
        path: 'personal-data',
        component: PersonalDataFormContainerComponent,
      },
      {
        path: 'confirmation',
        component: ConfirmationContainerComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
