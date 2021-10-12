import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PlacesDataModule } from '@valmira/ui/places/data';
import { ReservationsDataModule } from '@valmira/ui/reservations/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { PlaceDetailContainerComponent } from './containers/place-detail-container/place-detail-container.component';
import { RedDayPipe } from './pipes/red-day.pipe';
import { PlaceDetailRoutingModule } from './place-detail-routing.module';
import { PlaceDetailEffects } from './state/place-detail.effects';
import { reducer } from './state/place-detail.reducer';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([PlaceDetailEffects]),
    NzButtonModule,
    NzCarouselModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    PlaceDetailRoutingModule,
    PlacesDataModule,
    ReactiveFormsModule,
    ReservationsDataModule,
    StoreModule.forFeature('placeDetail', reducer),
  ],
  declarations: [PlaceDetailContainerComponent, PlaceDetailComponent, RedDayPipe],
})
export class PlaceDetailModule {}
