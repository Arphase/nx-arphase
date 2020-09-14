import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtSideNavComponent } from './side-nav.component';

describe('IvtSideNavComponent', () => {
  let component: IvtSideNavComponent;
  let fixture: ComponentFixture<IvtSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
