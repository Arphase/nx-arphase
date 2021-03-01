import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VehiclesEffects } from './state/vehicles.effects';
import { reducer } from './state/vehicles.reducer';

@NgModule({
  imports: [StoreModule.forFeature('vehicles', reducer), EffectsModule.forFeature([VehiclesEffects])],
})
export class VehiclesDataModule {}
