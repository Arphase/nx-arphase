import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { IvtInputModule } from '../../directives';
import { IvtFormFieldModule } from '../form-field';
import { IvtAutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [IvtAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, IvtInputModule, IvtFormFieldModule],
  exports: [IvtAutocompleteComponent],
})
export class IvtAutocompleteModule {}
