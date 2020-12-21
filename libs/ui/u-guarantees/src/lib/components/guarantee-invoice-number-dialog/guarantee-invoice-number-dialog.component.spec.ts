import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeInvoiceNumberDialogComponent } from './guarantee-invoice-number-dialog.component';

describe('GuaranteeInvoiceNumberDialogComponent', () => {
  let component: GuaranteeInvoiceNumberDialogComponent;
  let fixture: ComponentFixture<GuaranteeInvoiceNumberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeInvoiceNumberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeInvoiceNumberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
