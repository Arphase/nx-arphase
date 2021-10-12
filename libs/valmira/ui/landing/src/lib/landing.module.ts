import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlacesDataModule } from '@valmira/ui/places/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { LandingComponent } from './components/landing.component';
import { LandingContainerComponent } from './containers/landing-container/landing-container.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [CommonModule, LandingRoutingModule, NzLayoutModule, NzGridModule, NzButtonModule, PlacesDataModule],
  declarations: [LandingComponent, LandingContainerComponent],
})
export class LandingModule {}
