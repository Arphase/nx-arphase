import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';

@NgModule({
  imports: [CommonModule, AboutUsRoutingModule, NzGridModule, NzCarouselModule],
  declarations: [AboutUsComponent],
})
export class AboutUsModule {}
