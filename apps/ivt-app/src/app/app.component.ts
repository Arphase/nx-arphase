import { Component } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
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
  constructor(
    private platform: Platform,
    private themeService: ThemeService,
    private storage: Storage,
    private store: Store<IvtState>
  ) {
    this.initializeApp();
    this.themeService.loadTheme();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.storage.create();
      const user = {
        id: Number(await this.storage.get('id')),
        firstName: await this.storage.get('firstName'),
        secondName: await this.storage.get('secondName'),
        lastName: await this.storage.get('lastName'),
        secondLastName: await this.storage.get('secondLastName'),
        email: await this.storage.get('email'),
        role: await this.storage.get('role'),
        token: await this.storage.get('token'),
        companyId: Number(await this.storage.get('companyId')),
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
