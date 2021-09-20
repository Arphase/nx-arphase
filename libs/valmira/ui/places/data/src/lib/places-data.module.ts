import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { PlaceDataService } from './services/place-data.service';

@NgModule({
  imports: [CommonModule],
})
export class PlacesDataModule {
  constructor(entityDataService: EntityDataService, placeDataService: PlaceDataService) {
    entityDataService.registerService('Place', placeDataService);
  }
}
