import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Place } from '@valmira/domain';

@Component({
  selector: 'vma-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  @Input() places: Place[] = [];
}
