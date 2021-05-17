import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CompanySelectComponent } from './company-select.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CompanySelectComponent],
  exports: [CompanySelectComponent],
})
export class CompanySelectModule {}
