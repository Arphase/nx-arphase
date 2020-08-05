import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeRowContainerComponent } from './guarantee-row-container.component';

describe('GuaranteeRowContainerComponent', () => {
  let component: GuaranteeRowContainerComponent;
  let fixture: ComponentFixture<GuaranteeRowContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeRowContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
