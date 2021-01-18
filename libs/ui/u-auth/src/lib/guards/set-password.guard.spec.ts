import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { SetPasswordGuard } from './set-password.guard';

describe('SetPasswordGuard', () => {
  let guard: SetPasswordGuard;
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore(), provideMockActions(() => actions$)],
    });
    guard = TestBed.inject(SetPasswordGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
