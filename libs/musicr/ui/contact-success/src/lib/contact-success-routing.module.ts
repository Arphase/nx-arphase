import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactSuccessComponent } from './components/contact-success/contact-success.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactSuccessRoutingModule {}
