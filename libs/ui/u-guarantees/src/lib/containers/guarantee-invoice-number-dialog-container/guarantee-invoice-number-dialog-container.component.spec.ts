import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeInvoiceNumberDialogContainerComponent } from './guarantee-invoice-number-dialog-container.component';

describe('GuaranteeInvoiceNumberDialogContainerComponent', () => {
  let component: GuaranteeInvoiceNumberDialogContainerComponent;
  let fixture: ComponentFixture<GuaranteeInvoiceNumberDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeInvoiceNumberDialogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeInvoiceNumberDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
