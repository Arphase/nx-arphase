import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Themes, ThemeService } from '@ivt/u-ui';

@Component({
  selector: 'ivt-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyLogoComponent {
  get displayDarkLogo(): boolean {
    return this.themeService.currentTheme === Themes.default;
  }
  constructor(private themeService: ThemeService) {}
}