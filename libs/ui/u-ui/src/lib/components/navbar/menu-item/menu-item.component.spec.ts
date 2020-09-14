import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtMenuItemComponent } from './menu-item.component';

describe('IvtMenuItemComponent', () => {
  let component: IvtMenuItemComponent;
  let fixture: ComponentFixture<IvtMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtMenuItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
