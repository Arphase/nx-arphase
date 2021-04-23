import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { ProfileMenuComponent } from './profile-menu.component';

describe('ProfileMenuComponent', () => {
  let spectator: Spectator<ProfileMenuComponent>;
  const createComponent = createComponentFactory({
    component: ProfileMenuComponent,
    imports: [NzDropDownModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
