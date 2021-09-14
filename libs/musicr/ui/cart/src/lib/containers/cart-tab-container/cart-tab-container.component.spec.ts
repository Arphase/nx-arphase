import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTabContainerComponent } from './cart-tab-container.component';

describe('CartTabContainerComponent', () => {
  let component: CartTabContainerComponent;
  let fixture: ComponentFixture<CartTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTabContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
