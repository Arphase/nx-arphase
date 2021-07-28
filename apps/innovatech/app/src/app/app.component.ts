import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@arphase/ui';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    this.themeService.loadTheme();
  }
}
