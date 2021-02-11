import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtRadioFilterComponent } from './radio-filter.component';

@NgModule({
  declarations: [IvtRadioFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, NzGridModule, NzDropDownModule, NzIconModule],
  exports: [IvtRadioFilterComponent],
})
export class IvtRadioFilterModule {}
