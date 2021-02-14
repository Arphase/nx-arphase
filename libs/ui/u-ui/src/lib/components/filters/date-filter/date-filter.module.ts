import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { IvtDateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [IvtDateFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzRadioModule,
    NzDatePickerModule,
    NzFormModule,
    NzButtonModule,
    NzAlertModule,
  ],
  exports: [IvtDateFilterComponent],
})
export class IvtDateFilterModule {}
