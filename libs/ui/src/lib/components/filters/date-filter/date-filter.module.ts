import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { IvtInputModule } from '../../../directives';
import { IvtFormFieldModule } from '../../form-field';
import { IvtFilterModule } from '../filter';
import { IvtDateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [IvtDateFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IvtFilterModule,
    IvtFormFieldModule,
    IvtInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [IvtDateFilterComponent],
})
export class IvtDateFilterModule {}
