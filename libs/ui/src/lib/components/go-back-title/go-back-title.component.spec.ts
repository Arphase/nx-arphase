import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtGoBackTitleComponent } from './go-back-title.component';

describe('IvtGoBackTitleComponent', () => {
  let component: IvtGoBackTitleComponent;
  let fixture: ComponentFixture<IvtGoBackTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtGoBackTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtGoBackTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
