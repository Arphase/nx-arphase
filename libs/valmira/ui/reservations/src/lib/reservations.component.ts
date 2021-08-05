import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
