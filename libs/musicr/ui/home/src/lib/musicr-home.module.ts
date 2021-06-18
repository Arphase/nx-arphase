import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MusicrHomeRoutingModule } from './musicr-home-routing.module';


@NgModule({
  imports: [CommonModule, MusicrHomeRoutingModule],
  declarations: [
    HomeComponent
  ],
})
export class MusicrHomeModule {}
