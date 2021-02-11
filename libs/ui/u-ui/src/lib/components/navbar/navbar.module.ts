import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { IvtMenuBarComponent } from './menu-bar/menu-bar.component';
import { IvtMenuItemComponent } from './menu-item/menu-item.component';
import { IvtProfileMenuComponent } from './profile-menu/profile-menu.component';
import { IvtSideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [IvtMenuBarComponent, IvtProfileMenuComponent, IvtMenuItemComponent, IvtSideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    NzGridModule,
  ],
  exports: [IvtMenuBarComponent, IvtProfileMenuComponent, IvtMenuItemComponent, IvtSideNavComponent],
})
export class IvtNavbarModule {}
