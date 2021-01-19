import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionFormContainerComponent } from './revision-form-container.component';

describe('RevisionFormContainerComponent', () => {
  let component: RevisionFormContainerComponent;
  let fixture: ComponentFixture<RevisionFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
