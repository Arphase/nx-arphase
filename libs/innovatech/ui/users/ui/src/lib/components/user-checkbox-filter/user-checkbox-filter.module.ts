import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersDataModule } from '@innovatech/ui/users/data';
import { IvtCheckboxFilterModule } from '@arphase/ui';

import { UserCheckboxFilterComponent } from './user-checkbox-filter.component';

@NgModule({
  imports: [CommonModule, IvtCheckboxFilterModule, UsersDataModule],
  declarations: [UserCheckboxFilterComponent],
  exports: [UserCheckboxFilterComponent],
})
export class UserCheckboxFilterModule {}
