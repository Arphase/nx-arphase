import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  imports: [CommonModule, TermsAndConditionsRoutingModule],
  declarations: [TermsAndConditionsComponent],
})
export class TermsAndConditionsModule {}
