import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterModule, NzGridModule, NzButtonModule, NzIconModule],
  exports: [FooterComponent],
})
export class FooterModule {}
