import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormContainerComponent } from './group-form-container.component';

describe('GroupFormContainerComponent', () => {
  let component: GroupFormContainerComponent;
  let fixture: ComponentFixture<GroupFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
