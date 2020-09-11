import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderDialogContainerComponent } from './payment-order-dialog-container.component';

describe('PaymentOrderDialogContainerComponent', () => {
  let component: PaymentOrderDialogContainerComponent;
  let fixture: ComponentFixture<PaymentOrderDialogContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrderDialogContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
