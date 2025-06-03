import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxMaskDirective } from 'ngx-mask';

import { NzInputModule } from 'ng-zorro-antd/input';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    RouterModule,
    NgxMaskDirective,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
