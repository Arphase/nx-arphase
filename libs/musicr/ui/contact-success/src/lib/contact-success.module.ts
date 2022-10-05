import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GtagModule } from '@arphase/ui/gtag';

import { ContactSuccessComponent } from './components/contact-success/contact-success.component';
import { ContactSuccessRoutingModule } from './contact-success-routing.module';

@NgModule({
  imports: [CommonModule, ContactSuccessRoutingModule, GtagModule],
  declarations: [ContactSuccessComponent],
})
export class ContactSuccessModule {}
