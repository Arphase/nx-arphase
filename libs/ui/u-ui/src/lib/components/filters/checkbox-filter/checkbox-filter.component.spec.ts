import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtCheckboxFilterComponent } from './checkbox-filter.component';

describe('IvtCheckboxFilterComponent', () => {
  let component: IvtCheckboxFilterComponent;
  let fixture: ComponentFixture<IvtCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IvtCheckboxFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
