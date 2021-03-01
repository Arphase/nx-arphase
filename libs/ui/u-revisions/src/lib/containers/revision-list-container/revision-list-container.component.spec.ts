import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionListContainerComponent } from './revision-list-container.component';

describe('RevisionListContainerComponent', () => {
  let component: RevisionListContainerComponent;
  let fixture: ComponentFixture<RevisionListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
