import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { ApsStatusMessageComponent } from './status-message.component';

@NgModule({
  declarations: [ApsStatusMessageComponent],
  imports: [CommonModule, NzIconModule, NzAlertModule, NzSpaceModule],
  exports: [ApsStatusMessageComponent],
})
export class ApsStatusMessageModule {}
