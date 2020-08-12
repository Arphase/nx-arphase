import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';

import { IvtInputModule } from '../../directives';
import { IvtFormFieldModule } from '../form-field';
import { IvtAddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [IvtAddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IvtFormFieldModule,
    IvtInputModule,
    NgxMaskModule,
    MatSelectModule,
  ],
  exports: [IvtAddressFormComponent],
})
export class IvtAddressFormModule {}
