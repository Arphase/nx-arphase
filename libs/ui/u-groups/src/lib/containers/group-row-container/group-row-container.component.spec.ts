import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRowContainerComponent } from './group-row-container.component';

describe('GroupRowContainerComponent', () => {
  let component: GroupRowContainerComponent;
  let fixture: ComponentFixture<GroupRowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRowContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
