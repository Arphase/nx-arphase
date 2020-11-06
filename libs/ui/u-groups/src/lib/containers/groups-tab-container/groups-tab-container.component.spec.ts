import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsTabContainerComponent } from './groups-tab-container.component';

describe('GroupsTabContainerComponent', () => {
  let component: GroupsTabContainerComponent;
  let fixture: ComponentFixture<GroupsTabContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsTabContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
