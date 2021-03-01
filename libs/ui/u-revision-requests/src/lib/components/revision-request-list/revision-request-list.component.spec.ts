import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequestListComponent } from './revision-request-list.component';

describe('RevisionRequestListComponent', () => {
  let component: RevisionRequestListComponent;
  let fixture: ComponentFixture<RevisionRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
