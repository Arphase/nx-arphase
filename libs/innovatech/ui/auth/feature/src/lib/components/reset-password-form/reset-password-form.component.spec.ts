import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ResetPasswordFormComponent } from './reset-password-form.component';

describe('ResetPasswordFormComponent', () => {
  let spectator: Spectator<ResetPasswordFormComponent>;
  const createComponent = createComponentFactory({
    component: ResetPasswordFormComponent,
    imports: [ReactiveFormsModule],
    shallow: true
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
