import { CommonModule, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxMaskModule } from 'ngx-mask';

import { FooterModule } from './footer/footer.module';
import { MenuModule } from './menu/menu.module';
import { StoreWrapperRoutingModule } from './store-wrapper-routing.module';
import { StoreWrapperComponent } from './store-wrapper.component';

registerLocaleData(es);

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    MenuModule,
    NgxMaskModule.forRoot(),
    NzMessageModule,
    StoreWrapperRoutingModule,
  ],
  declarations: [StoreWrapperComponent],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  exports: [StoreWrapperComponent],
})
export class StoreWrapperModule {}
