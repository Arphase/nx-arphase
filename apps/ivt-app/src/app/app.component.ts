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
      const user = {
        id: Number(localStorage.getItem('id')),
        firstName: localStorage.getItem('firstName'),
        secondName: localStorage.getItem('secondName'),
        lastName: localStorage.getItem('lastName'),
        secondLastName: localStorage.getItem('secondLastName'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        token: localStorage.getItem('token'),
        companyId: Number(localStorage.getItem('companyId')),
      };
      this.store.dispatch(fromAuth.actions.loadUserFromStorage({ user }));

      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });
      }
    });
  }
}
