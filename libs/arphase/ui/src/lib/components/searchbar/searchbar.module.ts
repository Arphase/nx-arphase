import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { IvtSearchbarComponent } from './searchbar.component';

@NgModule({
  declarations: [IvtSearchbarComponent],
  imports: [CommonModule, ReactiveFormsModule, NzInputModule, NzIconModule],
  exports: [IvtSearchbarComponent],
})
export class IvtSearchbarModule {}
