import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtNavbarModule } from '@ivt/u-ui';

import { SpaRoutingModule } from './spa-routing.module';
import { SpaComponent } from './spa.component';

@NgModule({
  imports: [CommonModule, SpaRoutingModule, IvtNavbarModule],
  declarations: [SpaComponent],
})
export class SpaModule {}
