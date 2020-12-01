import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { IvtStatusMessageComponent } from './status-message.component';

@NgModule({
  declarations: [IvtStatusMessageComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IvtStatusMessageComponent],
})
export class IvtStatusMessageModule {}
