import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { IvtAutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [IvtAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzAutocompleteModule],
  exports: [IvtAutocompleteComponent],
})
export class IvtAutocompleteModule {}
