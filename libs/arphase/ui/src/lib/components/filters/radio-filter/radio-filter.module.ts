import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { IvtRadioFilterComponent } from './radio-filter.component';

@NgModule({
  declarations: [IvtRadioFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, NzDropDownModule, NzIconModule, NzRadioModule, NzButtonModule],
  exports: [IvtRadioFilterComponent],
})
export class IvtRadioFilterModule {}
