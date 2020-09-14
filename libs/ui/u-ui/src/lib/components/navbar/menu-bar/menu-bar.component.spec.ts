import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtMenuBarComponent } from './menu-bar.component';

describe('IvtMenuBarComponent', () => {
  let component: IvtMenuBarComponent;
  let fixture: ComponentFixture<IvtMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtMenuBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
