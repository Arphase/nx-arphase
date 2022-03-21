import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private nzIconService: NzIconService) {
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3-website-us-east-1.amazonaws.com');
  }
}
