import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mrl-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrequentQuestionsComponent {}
