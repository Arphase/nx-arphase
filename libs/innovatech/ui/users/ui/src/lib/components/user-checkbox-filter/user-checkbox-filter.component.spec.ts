import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckboxFilterComponent } from './user-checkbox-filter.component';

describe('UserCheckboxFilterComponent', () => {
  let component: UserCheckboxFilterComponent;
  let fixture: ComponentFixture<UserCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCheckboxFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
