import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MusicrHomeRoutingModule } from './musicr-home-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@NgModule({
  imports: [CommonModule, MusicrHomeRoutingModule, NzIconModule, NzGridModule, NzCarouselModule],
  declarations: [HomeComponent],
})
export class MusicrHomeModule {}
