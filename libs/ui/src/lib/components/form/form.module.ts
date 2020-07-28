import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtFormComponent } from './form.component';

@NgModule({
  declarations: [IvtFormComponent],
  imports: [CommonModule],
  exports: [IvtFormComponent],
})
export class IvtFormModule {}
