import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxMaskDirective } from 'ngx-mask';

import { FooterModule } from './footer/footer.module';
import { MenuModule } from './menu/menu.module';
import { StoreWrapperRoutingModule } from './store-wrapper-routing.module';
import { StoreWrapperComponent } from './store-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MenuModule,
    NgxMaskDirective.forRoot(),
    NzMessageModule,
    StoreWrapperRoutingModule,
  ],
  declarations: [StoreWrapperComponent],
  exports: [StoreWrapperComponent],
})
export class StoreWrapperModule {}
