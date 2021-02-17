import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequestFormComponent } from './revision-request-form.component';

describe('RevisionRequestFormComponent', () => {
  let component: RevisionRequestFormComponent;
  let fixture: ComponentFixture<RevisionRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
