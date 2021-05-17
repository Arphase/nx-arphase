import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
