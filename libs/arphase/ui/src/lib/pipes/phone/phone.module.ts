import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApsPhonePipe } from './phone.pipe';

@NgModule({
  declarations: [ApsPhonePipe],
  imports: [CommonModule],
  exports: [ApsPhonePipe],
})
export class ApsPhoneModule {}
