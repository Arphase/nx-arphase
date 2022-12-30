import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutocompleteModule, ApsAutoErrorModule, ApsAutoSelectModule } from '@arphase/ui/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NgxMaskDirective } from 'ngx-mask';

import { ApsAddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [ApsAddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ApsAutoErrorModule,
    ApsAutoSelectModule,
    ApsAutocompleteModule,
    NzAutocompleteModule,
  ],
  exports: [ApsAddressFormComponent],
})
export class ApsAddressFormModule {}
