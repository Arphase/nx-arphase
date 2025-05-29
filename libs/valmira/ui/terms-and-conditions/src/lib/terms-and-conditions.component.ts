import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TermsAndConditionsComponent {}
