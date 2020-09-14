import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeFormContainerComponent } from './guarantee-form-container.component';

describe('GuaranteeFormContainerComponent', () => {
  let component: GuaranteeFormContainerComponent;
  let fixture: ComponentFixture<GuaranteeFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
