import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { FrequentQuestionsRoutingModule } from './frequent-questions-routing.module';
import { FrequentQuestionsComponent } from './frequent-questions.component';

@NgModule({
  imports: [
    CommonModule,
    FrequentQuestionsRoutingModule,
    NzGridModule,
    NzButtonModule,
    NzCollapseModule,
    NzIconModule,
    NzDividerModule,
  ],
  declarations: [FrequentQuestionsComponent],
})
export class FrequentQuestionsModule {}
export class NzCollapseCustomComponent {}
