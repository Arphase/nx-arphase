import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordFormContainerComponent } from './reset-password-form-container.component';

describe('ResetPasswordFormContainerComponent', () => {
  let component: ResetPasswordFormContainerComponent;
  let fixture: ComponentFixture<ResetPasswordFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordFormContainerComponent ]
    })
    .compileComponents();
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
