import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtDataService } from '@innovatech/ui/core/data';
import { EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupDataService, GroupFilterDataService } from './services';
import { GroupsEffects } from './state';
import { reducer } from './state/groups.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('groups', reducer), EffectsModule.forFeature([GroupsEffects])],
})
export class GroupsDataModule {
  constructor(
    entityDataService: EntityDataService,
    groupDataService: GroupDataService,
    groupFilterDataService: GroupFilterDataService
  ) {
    const services: Record<string, IvtDataService<unknown>> = {
      Group: groupDataService,
      GroupFilter: groupFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
