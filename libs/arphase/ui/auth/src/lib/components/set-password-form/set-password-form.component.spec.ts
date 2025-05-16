import { SetPasswordFormComponent } from './set-password-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

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
