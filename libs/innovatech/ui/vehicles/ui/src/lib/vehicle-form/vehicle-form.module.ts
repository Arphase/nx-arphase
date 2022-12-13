import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { CompanySelectModule } from '@innovatech/ui/companies/ui';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule,
    ApsAutoErrorModule,
    NzFormModule,
    NzInputModule,
    CompanySelectModule,
  ],
  exports: [VehicleFormComponent],
})
export class VehicleFormModule {}
