import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { MusicrTermsAndConditionsRoutingModule } from './musicr-terms-and-conditions-routing.module';

@NgModule({
  imports: [CommonModule, MusicrTermsAndConditionsRoutingModule],
  declarations: [TermsAndConditionsComponent],
})
export class MusicrTermsAndConditionsModule {}
