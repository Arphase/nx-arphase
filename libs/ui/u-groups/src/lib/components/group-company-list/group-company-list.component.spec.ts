import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCompanyListComponent } from './group-company-list.component';

describe('GroupCompanyListComponent', () => {
  let component: GroupCompanyListComponent;
  let fixture: ComponentFixture<GroupCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
