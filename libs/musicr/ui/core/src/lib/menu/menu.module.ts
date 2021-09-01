import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { MenuContainerComponent } from './containers/menu-container/menu-container.component';

@NgModule({
  declarations: [MenuComponent, MenuContainerComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzAffixModule,
    NzGridModule,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule,
  ],
  exports: [MenuContainerComponent],
})
export class MenuModule {}
