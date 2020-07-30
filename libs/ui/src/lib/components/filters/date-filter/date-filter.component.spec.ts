import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtDateFilterComponent } from './date-filter.component';

describe('IvtDateFilterComponent', () => {
  let component: IvtDateFilterComponent;
  let fixture: ComponentFixture<IvtDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtDateFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
