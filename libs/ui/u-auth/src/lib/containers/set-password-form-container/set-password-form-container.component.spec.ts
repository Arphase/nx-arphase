import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPasswordFormContainerComponent } from './set-password-form-container.component';

describe('SetPasswordFormContainerComponent', () => {
  let component: SetPasswordFormContainerComponent;
  let fixture: ComponentFixture<SetPasswordFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPasswordFormContainerComponent ]
    })
    .compileComponents();
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
