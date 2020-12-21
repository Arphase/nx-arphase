import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IvtPhonePipe } from './phone.pipe';

@NgModule({
  declarations: [IvtPhonePipe],
  imports: [CommonModule],
  exports: [IvtPhonePipe],
})
export class IvtPhoneModule {}
