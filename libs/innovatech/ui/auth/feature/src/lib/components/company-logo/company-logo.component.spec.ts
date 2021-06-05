import { ThemeService } from '@arphase/ui';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { CompanyLogoComponent } from './company-logo.component';

describe('CompanyLogoComponent', () => {
  let spectator: Spectator<CompanyLogoComponent>;
  const createComponent = createComponentFactory({
    component: CompanyLogoComponent,
    mocks: [ThemeService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
