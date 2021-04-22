import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SetPasswordFormComponent } from './set-password-form.component';

describe('SetPasswordFormComponent', () => {
  let spectator: Spectator<SetPasswordFormComponent>;
  const createComponent = createComponentFactory({
    component: SetPasswordFormComponent,
    imports: [ReactiveFormsModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
