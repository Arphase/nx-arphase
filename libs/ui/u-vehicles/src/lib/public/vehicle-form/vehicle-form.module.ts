import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { IvtFormFieldModule, IvtInputModule } from '@ivt/u-ui';

import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, IvtFormFieldModule, IvtInputModule, MatSelectModule],
  exports: [VehicleFormComponent],
})
export class VehicleFormModule {}
