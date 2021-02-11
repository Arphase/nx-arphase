import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtFilterModule } from '../filter';
import { IvtDateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [IvtDateFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IvtFilterModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NzDropDownModule,
    MatFormFieldModule,
    MatInputModule,
    NzGridModule,
    NzIconModule,
  ],
  exports: [IvtDateFilterComponent],
})
export class IvtDateFilterModule {}
