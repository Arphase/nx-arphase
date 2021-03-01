import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRequestFormContainerComponent } from './revision-request-form-container.component';

describe('RevisionRequestFormContainerComponent', () => {
  let component: RevisionRequestFormContainerComponent;
  let fixture: ComponentFixture<RevisionRequestFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRequestFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRequestFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
