import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtTableHeaderComponent } from './table-header.component';

describe('IvtTableHeaderComponent', () => {
  let component: IvtTableHeaderComponent;
  let fixture: ComponentFixture<IvtTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
