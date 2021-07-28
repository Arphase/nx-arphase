import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FrequentQuestionsComponent } from './frequent-questions.component';
import { FrequentQuestionsRoutingModule } from './frequent-questions.routing.module';

@NgModule({
  imports: [CommonModule, FrequentQuestionsRoutingModule],
  declarations: [FrequentQuestionsComponent],
})
export class FrequentQuestionsModule {}
