import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequestListContainerComponent } from './revision-request-list-container.component';

describe('RevisionRequestListContainerComponent', () => {
  let component: RevisionRequestListContainerComponent;
  let fixture: ComponentFixture<RevisionRequestListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRequestListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequestListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
