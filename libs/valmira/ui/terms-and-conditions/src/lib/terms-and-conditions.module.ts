import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

@NgModule({
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    NzGridModule,
    NzDividerModule,
  ],
  declarations: [TermsAndConditionsComponent],
})
export class TermsAndConditionsModule {}
