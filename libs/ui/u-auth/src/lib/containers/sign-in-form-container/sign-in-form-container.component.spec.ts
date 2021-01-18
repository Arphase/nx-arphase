import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@ivt/u-state';
import { LoadingServiceMock } from '@ivt/u-tests';
import { provideMockStore } from '@ngrx/store/testing';

import { SignInFormContainerComponent } from './sign-in-form-container.component';

describe('SignInFormContainerComponent', () => {
  let component: SignInFormContainerComponent;
  let fixture: ComponentFixture<SignInFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInFormContainerComponent],
      providers: [provideMockStore(), { provide: LoadingService, useClass: LoadingServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
