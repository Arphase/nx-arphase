import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtTableHeaderColumnComponent } from './table-header-column.component';

describe('IvtTableHeaderColumnComponent', () => {
  let component: IvtTableHeaderColumnComponent;
  let fixture: ComponentFixture<IvtTableHeaderColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtTableHeaderColumnComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtTableHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
