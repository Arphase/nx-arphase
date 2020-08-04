import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtRowComponent } from './row.component';

describe('IvtRowComponent', () => {
  let component: IvtRowComponent;
  let fixture: ComponentFixture<IvtRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
