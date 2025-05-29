import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Guarantee } from '@innovatech/common/domain';

@Component({
  selector: 'ivt-guarantee-row-details',
  templateUrl: './guarantee-row-details.component.html',
  styleUrls: ['./guarantee-row-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GuaranteeRowDetailsComponent {
  @Input() item: Guarantee;
}
