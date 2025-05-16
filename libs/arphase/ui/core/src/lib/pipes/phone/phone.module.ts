import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsPhonePipe } from './phone.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, ApsPhonePipe],
  exports: [ApsPhonePipe],
})
export class ApsPhoneModule {}
