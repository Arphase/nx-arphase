import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Themes, ThemeService } from '../../services/theme.service';

export interface MenuItem {
  icon?: string;
  header?: string;
  display$?: Observable<boolean>;
  enabled?: boolean;
  path?: string | string[];
  children?: ChildMenuItem[];
  cy?: string;
}
export interface ChildMenuItem {
  label?: string;
  enabled?: boolean;
  path?: string[];
}
export interface SpaLayoutOptions {
  logoUrl: string;
  show: {
    darkModeToggle: boolean;
  };
}

@Component({
    selector: 'aps-spa-layout',
    templateUrl: './spa-layout.component.html',
    styleUrls: ['./spa-layout.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SpaLayoutComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() name: string;
  @Input() email: string;
  @Input() version: string;
  @Input() options: SpaLayoutOptions = {
    logoUrl: 'assets/img/logo.svg',
    show: {
      darkModeToggle: true,
    },
  };

  isCollapsed: boolean;
  mobileQuery: MediaQueryList;
  darkModeChecked = this.themeService.currentTheme === Themes.dark;
  private _mobileQueryListener: () => void;
  @Output() logout = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef, private media: MediaMatcher, private themeService: ThemeService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isCollapsed = this.mobileQuery.matches;
  }

  toggleIsCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  toggleDarkMode(): void {
    this.themeService.loadTheme(this.darkModeChecked ? Themes.dark : Themes.default);
  }
}
