import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { IvtStatusMessageComponent } from './status-message.component';

@NgModule({
  declarations: [IvtStatusMessageComponent],
  imports: [CommonModule, NzIconModule],
  exports: [IvtStatusMessageComponent],
})
export class IvtStatusMessageModule {}
