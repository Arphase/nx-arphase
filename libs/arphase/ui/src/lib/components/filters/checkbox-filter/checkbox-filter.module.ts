import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ApsSearchbarModule } from '../../searchbar';
import { ApsCheckboxFilterComponent } from './checkbox-filter.component';

@NgModule({
  declarations: [ApsCheckboxFilterComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzIconModule,
    FormsModule,
    NzButtonModule,
    ApsSearchbarModule,
    ScrollingModule,
    NzEmptyModule,
  ],
  exports: [ApsCheckboxFilterComponent],
})
export class ApsCheckboxFilterModule {}
