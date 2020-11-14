import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormDialogComponent } from './group-form-companies.component';

describe('CompanyFormDialogComponent', () => {
  let component: CompanyFormDialogComponent;
  let fixture: ComponentFixture<CompanyFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
