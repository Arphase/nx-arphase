import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule, ApsAutoSelectModule, ApsAutocompleteModule } from '@arphase/ui/core';
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
    ApsAutocompleteModule,
    NzAutocompleteModule,
  ],
  exports: [IvtAddressFormComponent],
})
export class IvtAddressFormModule {}
