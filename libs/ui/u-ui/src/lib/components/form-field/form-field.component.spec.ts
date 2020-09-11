import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtFormFieldComponent } from './form-field.component';

describe('IvtFormFieldComponent', () => {
  let component: IvtFormFieldComponent;
  let fixture: ComponentFixture<IvtFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
