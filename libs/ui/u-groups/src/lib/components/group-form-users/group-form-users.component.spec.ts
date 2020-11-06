import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormUsersComponent } from './group-form-users.component';

describe('GroupFormUsersComponent', () => {
  let component: GroupFormUsersComponent;
  let fixture: ComponentFixture<GroupFormUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
