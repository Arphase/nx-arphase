import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@arphase/ui/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private themeService: ThemeService, private nzIconService: NzIconService) {
    this.themeService.loadTheme();
    this.nzIconService.changeAssetsSource('https://arphase-icons.s3.amazonaws.com');
  }
}
