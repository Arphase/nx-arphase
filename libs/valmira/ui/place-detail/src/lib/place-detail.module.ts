import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacesDataModule } from '@valmira/ui/places/data';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { PlaceDetailContainerComponent } from './containers/place-detail-container/place-detail-container.component';
import { PlaceDetailRoutingModule } from './place-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    PlaceDetailRoutingModule,
    PlacesDataModule,
    ReactiveFormsModule,
  ],
  declarations: [PlaceDetailContainerComponent, PlaceDetailComponent],
})
export class PlaceDetailModule {}
