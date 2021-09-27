import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManifestRoutingModule } from './manifest-routing.module';
import { ManifestComponent } from './manifest.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [CommonModule, ManifestRoutingModule, NzLayoutModule, NzGridModule, NzButtonModule],
  declarations: [ManifestComponent],
})
export class ManifestModule {}
