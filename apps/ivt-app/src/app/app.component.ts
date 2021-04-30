import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { fromAuth, IvtState } from '@ivt/u-state';
import { ThemeService } from '@ivt/u-ui';
import { Store } from '@ngrx/store';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.less'],
})
export class AppComponent {
  constructor(private platform: Platform, private themeService: ThemeService, private store: Store<IvtState>) {
    this.initializeApp();
    this.themeService.loadTheme();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });
      }
    });
  }
}
