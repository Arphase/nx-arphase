import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeRowDetailsComponent } from './guarantee-row-details.component';

describe('GuaranteeRowDetailsComponent', () => {
  let component: GuaranteeRowDetailsComponent;
  let fixture: ComponentFixture<GuaranteeRowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeRowDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeRowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
