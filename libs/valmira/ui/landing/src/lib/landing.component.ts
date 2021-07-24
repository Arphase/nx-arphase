import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
