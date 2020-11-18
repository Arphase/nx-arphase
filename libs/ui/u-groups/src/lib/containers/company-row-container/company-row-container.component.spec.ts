import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRowContainerComponent } from './company-row-container.component';

describe('CompanyRowContainerComponent', () => {
  let component: CompanyRowContainerComponent;
  let fixture: ComponentFixture<CompanyRowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRowContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
