import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/ui';

import { SpaRoutingModule } from './spa-routing.module';
import { SpaComponent } from './spa.component';

@NgModule({
  imports: [CommonModule, SpaRoutingModule, IvtUiModule],
  declarations: [SpaComponent],
})
export class SpaModule {}
