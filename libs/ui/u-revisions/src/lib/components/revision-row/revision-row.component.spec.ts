import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRowComponent } from './revision-row.component';

describe('RevisionRowComponent', () => {
  let component: RevisionRowComponent;
  let fixture: ComponentFixture<RevisionRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisionRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
