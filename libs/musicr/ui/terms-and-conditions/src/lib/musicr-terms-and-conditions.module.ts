import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MusicrTermsAndConditionsRoutingModule } from './musicr-terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  imports: [CommonModule, MusicrTermsAndConditionsRoutingModule],
  declarations: [TermsAndConditionsComponent],
})
export class MusicrTermsAndConditionsModule {}
