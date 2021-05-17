import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCheckboxFilterComponent } from './group-checkbox-filter.component';

describe('GroupCheckboxFilterComponent', () => {
  let component: GroupCheckboxFilterComponent;
  let fixture: ComponentFixture<GroupCheckboxFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCheckboxFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCheckboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
