import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequestsComponent } from './revision-requests.component';

describe('RevisionRequestsComponent', () => {
  let component: RevisionRequestsComponent;
  let fixture: ComponentFixture<RevisionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
