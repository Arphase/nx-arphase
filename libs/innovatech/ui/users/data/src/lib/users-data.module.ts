import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data';

import { UserDataService } from './services/user-data.service';

@NgModule({
  imports: [CommonModule],
})
export class UsersDataModule {
  constructor(entityDataService: EntityDataService, userDataService: UserDataService) {
    entityDataService.registerService('User', userDataService);
  }
}
