import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupsEffects } from './state';
import { reducer } from './state/groups.reducer';

@NgModule({
  imports: [StoreModule.forFeature('groups', reducer), EffectsModule.forFeature([GroupsEffects])],
})
export class GroupsDataModule {}
