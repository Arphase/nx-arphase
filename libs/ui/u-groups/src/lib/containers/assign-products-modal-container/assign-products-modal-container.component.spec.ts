import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProductsModalContainerComponent } from './assign-products-modal-container.component';

describe('AssignProductsModalContainerComponent', () => {
  let component: AssignProductsModalContainerComponent;
  let fixture: ComponentFixture<AssignProductsModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProductsModalContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProductsModalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
