
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MenuContainerComponent } from './menu-container.component';

describe('MenuContainerComponent', () => {
  let spectator: Spectator<MenuContainerComponent>;
  const createComponent = createComponentFactory({
    component: MenuContainerComponent,
    schemas: [NO_ERRORS_SCHEMA],
    imports: [HttpClientTestingModule],

  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
