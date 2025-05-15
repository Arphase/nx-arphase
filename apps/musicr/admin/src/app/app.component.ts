import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
    selector: 'mrl-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent {
  constructor(private nzIconService: NzIconService) {
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3.amazonaws.com');
  }
}
