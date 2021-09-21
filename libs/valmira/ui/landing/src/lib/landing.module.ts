import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [CommonModule, LandingRoutingModule, NzLayoutModule, NzGridModule, NzButtonModule],
  declarations: [LandingComponent],
})
export class LandingModule {}
