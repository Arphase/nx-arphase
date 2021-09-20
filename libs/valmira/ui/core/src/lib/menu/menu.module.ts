import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzDrawerModule,
    NzIconModule,
    NzAffixModule,
    NzButtonModule,
    NzGridModule,
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
