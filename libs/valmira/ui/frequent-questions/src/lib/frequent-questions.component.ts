import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-frequent-questions',
  templateUrl: './frequent-questions.component.html',
  styleUrls: ['./frequent-questions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrequentQuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
