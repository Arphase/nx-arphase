import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { IvtStatusMessageComponent } from './status-message.component';

@NgModule({
  declarations: [IvtStatusMessageComponent],
  imports: [CommonModule, NzIconModule, NzAlertModule, NzSpaceModule],
  exports: [IvtStatusMessageComponent],
})
export class IvtStatusMessageModule {}
