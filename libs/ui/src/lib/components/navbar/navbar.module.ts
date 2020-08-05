import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { IvtMenuBarComponent } from './menu-bar/menu-bar.component';
import { IvtProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [IvtMenuBarComponent, IvtProfileMenuComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  exports: [IvtMenuBarComponent, IvtProfileMenuComponent],
})
export class IvtNavbarModule {}
