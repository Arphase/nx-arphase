import { ReactiveFormsModule } from '@angular/forms';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SignInFormComponent } from './sign-in-form.component';

describe('SignInFormComponent', () => {
  let spectator: Spectator<SignInFormComponent>;
  const createComponent = createComponentFactory({
    component: SignInFormComponent,
    imports: [ReactiveFormsModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
