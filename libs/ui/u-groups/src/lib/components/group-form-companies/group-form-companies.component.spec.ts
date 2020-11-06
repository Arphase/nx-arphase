import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormCompaniesComponent } from './group-form-companies.component';

describe('GroupFormCompaniesComponent', () => {
  let component: GroupFormCompaniesComponent;
  let fixture: ComponentFixture<GroupFormCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
