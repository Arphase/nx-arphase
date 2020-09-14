import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtEmptyStateComponent } from './empty-state.component';

describe('IvtEmptyStateComponent', () => {
  let component: IvtEmptyStateComponent;
  let fixture: ComponentFixture<IvtEmptyStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtEmptyStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
