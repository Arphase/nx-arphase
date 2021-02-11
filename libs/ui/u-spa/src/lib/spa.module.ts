import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ProfileMenuComponent } from './components/profile-menu';
import { SpaRoutingModule } from './spa-routing.module';
import { SpaComponent } from './spa.component';

@NgModule({
  imports: [
    CommonModule,
    SpaRoutingModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzButtonModule,
    NzLayoutModule,
    NzAvatarModule,
    MatMenuModule,
  ],
  declarations: [SpaComponent, ProfileMenuComponent],
})
export class SpaModule {}
