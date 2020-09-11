import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtProfileMenuComponent } from './profile-menu.component';

describe('IvtProfileMenuComponent', () => {
  let component: IvtProfileMenuComponent;
  let fixture: ComponentFixture<IvtProfileMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtProfileMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
