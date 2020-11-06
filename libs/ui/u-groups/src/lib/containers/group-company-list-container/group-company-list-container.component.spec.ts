import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCompanyListContainerComponent } from './group-company-list-container.component';

describe('GroupCompanyListContainerComponent', () => {
  let component: GroupCompanyListContainerComponent;
  let fixture: ComponentFixture<GroupCompanyListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCompanyListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCompanyListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
