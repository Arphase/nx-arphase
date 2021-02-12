import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtCheckboxFilterComponent } from './checkbox-filter.component';

@NgModule({
  declarations: [IvtCheckboxFilterComponent],
  imports: [CommonModule, NzDropDownModule, ScrollingModule, NzCheckboxModule, NzGridModule, NzIconModule, FormsModule],
  exports: [IvtCheckboxFilterComponent],
})
export class IvtCheckboxFilterModule {}
