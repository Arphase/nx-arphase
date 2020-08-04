import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeRowComponent } from './guarantee-row.component';

describe('GuaranteeRowComponent', () => {
  let component: GuaranteeRowComponent;
  let fixture: ComponentFixture<GuaranteeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
