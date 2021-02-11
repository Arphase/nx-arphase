import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ApsAutoErrorModule } from '@arphase/ui';
import { IvtFormFieldModule, IvtInputModule } from '@ivt/u-ui';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IvtFormFieldModule,
    IvtInputModule,
    MatSelectModule,
    NzGridModule,
    ApsAutoErrorModule,
    NzFormModule,
    NzInputModule,
  ],
  exports: [VehicleFormComponent],
})
export class VehicleFormModule {}
