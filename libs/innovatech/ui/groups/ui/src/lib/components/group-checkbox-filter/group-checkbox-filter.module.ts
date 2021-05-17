import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupsDataModule } from '@innovatech/ui/groups/data';
import { IvtCheckboxFilterModule } from '@ivt/u-ui';

import { GroupCheckboxFilterComponent } from './group-checkbox-filter.component';

@NgModule({
  imports: [CommonModule, IvtCheckboxFilterModule, GroupsDataModule],
  declarations: [GroupCheckboxFilterComponent],
  exports: [GroupCheckboxFilterComponent],
})
export class GroupCheckboxFilterModule {}
