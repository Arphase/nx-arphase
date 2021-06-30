import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('FooterComponent', () => {
  let spectator: Spectator<FooterComponent>;
  const createComponent = createComponentFactory({
    component: FooterComponent,
    imports: [ReactiveFormsModule],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
