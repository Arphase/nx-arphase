import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { AppComponent } from './app.component';

let spectator: Spectator<AppComponent>;
const createComponent = createComponentFactory({
  component: AppComponent,
  imports: [RouterTestingModule],
  shallow: true,
});

beforeEach(() => (spectator = createComponent()));

it('should create', () => {
  expect(spectator.component).toBeTruthy();
});
