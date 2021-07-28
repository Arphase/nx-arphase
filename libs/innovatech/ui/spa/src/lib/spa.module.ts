import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpaLayoutModule } from '@arphase/ui';

import { SpaComponent } from './spa.component';

@NgModule({
  imports: [CommonModule, SpaLayoutModule],
  declarations: [SpaComponent],
})
export class SpaModule {}
