import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtRadioFilterComponent } from './radio-filter.component';

describe('IvtRadioFilterComponent', () => {
  let component: IvtRadioFilterComponent;
  let fixture: ComponentFixture<IvtRadioFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtRadioFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtRadioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
