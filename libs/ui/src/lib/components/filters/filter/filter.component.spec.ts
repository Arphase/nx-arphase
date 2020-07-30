import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtFilterComponent } from './filter.component';

describe('IvtFilterComponent', () => {
  let component: IvtFilterComponent;
  let fixture: ComponentFixture<IvtFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
