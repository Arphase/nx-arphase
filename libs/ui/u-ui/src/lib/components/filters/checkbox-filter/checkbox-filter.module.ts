import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtCheckboxFilterComponent } from './checkbox-filter.component';

@NgModule({
  declarations: [IvtCheckboxFilterComponent],
  imports: [CommonModule, NzDropDownModule, NzCheckboxModule, NzIconModule, FormsModule, NzButtonModule],
  exports: [IvtCheckboxFilterComponent],
})
export class IvtCheckboxFilterModule {}
