import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDataService } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';

import { UserFilterDataService } from './services';
import { UserDataService } from './services/user-data.service';

@NgModule({
  imports: [CommonModule],
})
export class UsersDataModule {
  constructor(
    entityDataService: EntityDataService,
    userDataService: UserDataService,
    userFilterDataService: UserFilterDataService
  ) {
    const services: Record<string, ApsDataService<unknown>> = {
      User: userDataService,
      UserFilter: userFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
