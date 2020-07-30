import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ivt-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtEmptyStateComponent {
  @Input() message: string;
  @Input() icon = 'description';
}
