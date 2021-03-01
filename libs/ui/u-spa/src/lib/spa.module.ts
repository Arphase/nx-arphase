import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

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
    NzDropDownModule,
    NzDividerModule,
    NzSpaceModule,
    NzTypographyModule,
    NzGridModule,
    NzSwitchModule,
    FormsModule,
  ],
  declarations: [SpaComponent, ProfileMenuComponent],
})
export class SpaModule {}
