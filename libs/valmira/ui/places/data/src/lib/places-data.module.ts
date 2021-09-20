import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PlaceDataService } from './services/place-data.service';
import { PlacesEfects } from './state/places.effects';
import { reducer } from './state/places.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('places', reducer), EffectsModule.forFeature([PlacesEfects])],
})
export class PlacesDataModule {
  constructor(entityDataService: EntityDataService, placeDataService: PlaceDataService) {
    entityDataService.registerService('Place', placeDataService);
  }
}
