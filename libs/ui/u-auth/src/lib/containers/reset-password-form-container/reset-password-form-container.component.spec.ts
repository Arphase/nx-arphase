import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@ivt/u-state';
import { LoadingServiceMock } from '@ivt/u-tests';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ResetPasswordFormContainerComponent } from './reset-password-form-container.component';

describe('ResetPasswordFormContainerComponent', () => {
  let component: ResetPasswordFormContainerComponent;
  let fixture: ComponentFixture<ResetPasswordFormContainerComponent>;
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Action>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetPasswordFormContainerComponent],
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        { provide: LoadingService, useClass: LoadingServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
