import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormsContainerComponent } from './group-forms-container.component';

describe('GroupFormsContainerComponent', () => {
  let component: GroupFormsContainerComponent;
  let fixture: ComponentFixture<GroupFormsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
