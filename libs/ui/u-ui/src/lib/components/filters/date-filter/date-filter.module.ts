import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { IvtFilterModule } from '../filter';
import { IvtDateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [IvtDateFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IvtFilterModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzRadioModule,
    NzDatePickerModule
  ],
  exports: [IvtDateFilterComponent],
})
export class IvtDateFilterModule {}
