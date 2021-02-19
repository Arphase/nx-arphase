import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Guarantee } from '@ivt/c-data';

@Component({
  selector: 'ivt-guarantee-row-details',
  templateUrl: './guarantee-row-details.component.html',
  styleUrls: ['./guarantee-row-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeRowDetailsComponent {
  @Input() item: Guarantee;
}
