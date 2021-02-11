import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { IvtRadioFilterComponent } from './radio-filter.component';

@NgModule({
  declarations: [IvtRadioFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, NzGridModule, NzDropDownModule, NzIconModule, NzRadioModule],
  exports: [IvtRadioFilterComponent],
})
export class IvtRadioFilterModule {}
