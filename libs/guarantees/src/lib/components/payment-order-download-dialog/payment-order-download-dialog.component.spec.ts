import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderDownloadDialogComponent } from './payment-order-download-dialog.component';

describe('PaymentOrderDownloadDialogComponent', () => {
  let component: PaymentOrderDownloadDialogComponent;
  let fixture: ComponentFixture<PaymentOrderDownloadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOrderDownloadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOrderDownloadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
