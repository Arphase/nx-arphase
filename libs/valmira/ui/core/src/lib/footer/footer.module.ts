import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, RouterModule, NzLayoutModule, NzGridModule, NzButtonModule],
  exports: [FooterComponent],
})
export class FooterModule {}
