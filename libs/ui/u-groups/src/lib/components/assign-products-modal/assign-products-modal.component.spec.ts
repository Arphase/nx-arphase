import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductsModalComponent } from './assign-products-modal.component';

describe('AssignProductsModalComponent', () => {
  let component: AssignProductsModalComponent;
  let fixture: ComponentFixture<AssignProductsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
