import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IvtFormFieldModule, IvtInputModule } from '@ivt/u-ui';

import { VehicleFormComponent } from './vehicle-form.component';

@NgModule({
  declarations: [VehicleFormComponent],
  imports: [CommonModule, ReactiveFormsModule, IvtFormFieldModule, IvtInputModule],
  exports: [VehicleFormComponent],
})
export class VehicleFormModule {}
