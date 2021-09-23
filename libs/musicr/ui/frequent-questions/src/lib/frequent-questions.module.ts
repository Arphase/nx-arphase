import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrequentQuestionsRoutingModule } from './frequent-questions-routing.module';
import { FrequentQuestionsComponent } from './frequent-questions.component';

@NgModule({
  imports: [CommonModule, FrequentQuestionsRoutingModule],
  declarations: [FrequentQuestionsComponent],
})
export class FrequentQuestionsModule {}
