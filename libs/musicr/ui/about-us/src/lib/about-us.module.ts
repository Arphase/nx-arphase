import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { Title } from '@angular/platform-browser';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';

@NgModule({
  imports: [CommonModule, AboutUsRoutingModule, NzGridModule, NzCarouselModule],
  declarations: [AboutUsComponent],
})
export class AboutUsModule {
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Music Revolution - Sobre Nosotros');
  }
}
