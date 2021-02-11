import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgxMaskModule } from 'ngx-mask';

import { IvtInputModule } from '../../directives';
import { IvtAutocompleteModule } from '../autocomplete';
import { IvtFormFieldModule } from '../form-field';
import { IvtAddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [IvtAddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IvtFormFieldModule,
    IvtInputModule,
    IvtAutocompleteModule,
    NgxMaskModule,
    MatSelectModule,
    NzGridModule,
  ],
  exports: [IvtAddressFormComponent],
})
export class IvtAddressFormModule {}
