import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,NzLayoutModule, NzMenuModule,
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
