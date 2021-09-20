import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupsDataModule } from '@innovatech/ui/groups/data';
import { ApsCheckboxFilterModule } from '@arphase/ui/core';

import { GroupCheckboxFilterComponent } from './group-checkbox-filter.component';

@NgModule({
  imports: [CommonModule, ApsCheckboxFilterModule, GroupsDataModule],
  declarations: [GroupCheckboxFilterComponent],
  exports: [GroupCheckboxFilterComponent],
})
export class GroupCheckboxFilterModule {}
