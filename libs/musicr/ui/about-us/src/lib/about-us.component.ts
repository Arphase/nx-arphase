import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mrl-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AboutUsComponent {}
