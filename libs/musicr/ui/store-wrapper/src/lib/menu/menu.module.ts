import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { MenuComponent } from './components/menu/menu.component';
import { MenuContainerComponent } from './containers/menu-container/menu-container.component';

@NgModule({
  declarations: [MenuComponent, MenuContainerComponent],
  imports: [
    CommonModule,
    NzAffixModule,
    NzBadgeModule,
    NzButtonModule,
    NzDrawerModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    RouterModule,
  ],
  exports: [MenuContainerComponent],
})
export class MenuModule {}
