import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VehicleDataService } from './services';
import { VehiclesEffects } from './state/vehicles.effects';
import { reducer } from './state/vehicles.reducer';

@NgModule({
  imports: [StoreModule.forFeature('vehicles', reducer), EffectsModule.forFeature([VehiclesEffects])],
})
export class VehiclesDataModule {
  constructor(entityDataService: EntityDataService, vehicleDataService: VehicleDataService) {
    entityDataService.registerService('Vehicle', vehicleDataService);
  }
}
