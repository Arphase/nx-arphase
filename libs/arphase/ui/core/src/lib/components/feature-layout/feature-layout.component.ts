import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'aps-feature-layout',
    templateUrl: './feature-layout.component.html',
    styleUrls: ['./feature-layout.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ApsFeatureLayoutComponent {
  constructor(public route: ActivatedRoute) {}
}
