import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApsAutoErrorModule } from '@arphase/ui/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxMaskModule } from 'ngx-mask';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ApsAutoErrorModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule,
    RouterModule,
    NgxMaskModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
