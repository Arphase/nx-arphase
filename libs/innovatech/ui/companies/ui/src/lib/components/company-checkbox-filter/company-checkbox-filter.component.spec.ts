import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCheckboxFilterComponent } from './company-checkbox-filter.component';

describe('CompanyCheckboxFilterComponent', () => {
  let component: CompanyCheckboxFilterComponent;
  let fixture: ComponentFixture<CompanyCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyCheckboxFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
