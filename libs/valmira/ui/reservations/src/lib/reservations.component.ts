import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent {}
