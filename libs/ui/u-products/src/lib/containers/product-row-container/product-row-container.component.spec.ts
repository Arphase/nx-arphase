import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRowContainerComponent } from './product-row-container.component';

describe('ProductRowContainerComponent', () => {
  let component: ProductRowContainerComponent;
  let fixture: ComponentFixture<ProductRowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRowContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
