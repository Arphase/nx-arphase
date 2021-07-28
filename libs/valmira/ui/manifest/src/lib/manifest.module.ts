import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManifestRoutingModule } from './manifest-routing.module';
import { ManifestComponent } from './manifest.component';

@NgModule({
  imports: [CommonModule, ManifestRoutingModule],
  declarations: [ManifestComponent],
})
export class ManifestModule {}
