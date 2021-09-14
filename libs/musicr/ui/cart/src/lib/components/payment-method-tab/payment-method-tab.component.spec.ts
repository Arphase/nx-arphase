import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodTabComponent } from './payment-method-tab.component';

describe('PaymentMethodTabComponent', () => {
  let component: PaymentMethodTabComponent;
  let fixture: ComponentFixture<PaymentMethodTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
