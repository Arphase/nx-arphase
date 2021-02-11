import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';

import { IvtGoBackTitleComponent } from './go-back-title.component';

@NgModule({
  declarations: [IvtGoBackTitleComponent],
  imports: [CommonModule, RouterModule, NzIconModule],
  exports: [IvtGoBackTitleComponent],
})
export class IvtGoBackTitleModule {}
