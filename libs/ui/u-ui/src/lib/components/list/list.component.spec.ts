import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtListComponent } from './list.component';

describe('IvtListComponent', () => {
  let component: IvtListComponent;
  let fixture: ComponentFixture<IvtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
