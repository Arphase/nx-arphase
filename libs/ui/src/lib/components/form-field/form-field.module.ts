import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { IvtFormFieldComponent } from './form-field.component';

@NgModule({
  declarations: [IvtFormFieldComponent],
  imports: [CommonModule, ObserversModule, MatFormFieldModule, MatInputModule],
  exports: [IvtFormFieldComponent],
})
export class IvtFormFieldModule {}
