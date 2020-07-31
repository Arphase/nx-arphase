import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtVirtualScrollComponent } from './virtual-scroll.component';

describe('IvtVirtualScrollComponent', () => {
  let component: IvtVirtualScrollComponent;
  let fixture: ComponentFixture<IvtVirtualScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtVirtualScrollComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
