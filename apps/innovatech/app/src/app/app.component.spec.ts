import { ThemeService } from '@arphase/ui/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzIconService } from 'ng-zorro-antd/icon';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    mocks: [ThemeService, NzIconService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
