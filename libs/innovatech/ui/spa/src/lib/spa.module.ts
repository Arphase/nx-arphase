import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpaLayoutModule } from '@arphase/ui/core';

import { SpaRoutingModule } from './spa-routing.module';
import { SpaComponent } from './spa.component';

@NgModule({
  imports: [CommonModule, SpaRoutingModule, SpaLayoutModule],
  declarations: [SpaComponent],
})
export class SpaModule {}
