import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  ],
  exports: [IvtAddressFormComponent],
})
export class IvtAddressFormModule {}
