import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '@ivt/u-state';
import { LoadingServiceMock } from '@ivt/u-tests';
import { provideMockStore } from '@ngrx/store/testing';

import { SetPasswordFormContainerComponent } from './set-password-form-container.component';

describe('SetPasswordFormContainerComponent', () => {
  let component: SetPasswordFormContainerComponent;
  let fixture: ComponentFixture<SetPasswordFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SetPasswordFormContainerComponent],
      providers: [provideMockStore(), { provide: LoadingService, useClass: LoadingServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
