import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IvtFormFieldModule, IvtInputModule } from '@ivt/u-ui';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, IvtFormFieldModule, IvtInputModule, MatSelectModule, NzGridModule],
  exports: [VehicleFormComponent],
})
export class VehicleFormModule {}
