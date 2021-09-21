import { NO_ERRORS_SCHEMA } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

describe('MenuComponent', () => {
  let spectator: Spectator<MenuComponent>;
  const createComponent = createComponentFactory({
    component: MenuComponent,
    schemas: [NO_ERRORS_SCHEMA],
    imports: [RouterTestingModule, NzDrawerModule],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
