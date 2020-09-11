import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { IvtGoBackTitleComponent } from './go-back-title.component';

@NgModule({
  declarations: [IvtGoBackTitleComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [IvtGoBackTitleComponent],
})
export class IvtGoBackTitleModule {}
