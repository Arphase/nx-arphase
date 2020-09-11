import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { IvtRadioFilterComponent } from './radio-filter.component';

@NgModule({
  declarations: [IvtRadioFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, MatMenuModule, MatRadioModule],
  exports: [IvtRadioFilterComponent],
})
export class IvtRadioFilterModule {}
