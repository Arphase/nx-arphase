import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { ApsDateFilterComponent } from './date-filter.component';

@NgModule({
  declarations: [ApsDateFilterComponent],
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
    NzTypographyModule,
    NzTagModule,
  ],
  exports: [ApsDateFilterComponent],
})
export class ApsDateFilterModule {}
