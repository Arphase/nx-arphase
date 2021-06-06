import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsAutoSelectModule, AutocompleteModule } from '@arphase/ui';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskModule } from 'ngx-mask';

import { IvtAddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [IvtAddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ApsAutoErrorModule,
    ApsAutoSelectModule,
    AutocompleteModule,
    NzAutocompleteModule,
  ],
  exports: [IvtAddressFormComponent],
})
export class IvtAddressFormModule {}
