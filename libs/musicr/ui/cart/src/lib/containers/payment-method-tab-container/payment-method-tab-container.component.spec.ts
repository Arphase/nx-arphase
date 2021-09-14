import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodTabContainerComponent } from './payment-method-tab-container.component';

describe('PaymentMethodTabContainerComponent', () => {
  let component: PaymentMethodTabContainerComponent;
  let fixture: ComponentFixture<PaymentMethodTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodTabContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
