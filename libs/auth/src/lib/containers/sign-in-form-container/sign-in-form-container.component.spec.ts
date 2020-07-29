import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormContainerComponent } from './sign-in-form-container.component';

describe('SignInFormContainerComponent', () => {
  let component: SignInFormContainerComponent;
  let fixture: ComponentFixture<SignInFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInFormContainerComponent ]
    })
    .compileComponents();
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
