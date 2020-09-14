import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderDialogComponent } from './payment-order-dialog.component';

describe('PaymentOrderDialogComponent', () => {
  let component: PaymentOrderDialogComponent;
  let fixture: ComponentFixture<PaymentOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
