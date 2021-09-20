import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { ApsFeatureLayoutComponent } from './feature-layout.component';

@NgModule({
  declarations: [ApsFeatureLayoutComponent],
  imports: [CommonModule, RouterModule, NzGridModule, NzCardModule],
  exports: [ApsFeatureLayoutComponent],
})
export class ApsFeatureLayoutModule {}
