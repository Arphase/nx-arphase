import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormsComponent } from './group-forms.component';

describe('GroupFormComponent', () => {
  let component: GroupFormsComponent;
  let fixture: ComponentFixture<GroupFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
