import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormParentComponent } from './group-form-parent.component';

describe('GroupFormParentComponent', () => {
  let component: GroupFormParentComponent;
  let fixture: ComponentFixture<GroupFormParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
