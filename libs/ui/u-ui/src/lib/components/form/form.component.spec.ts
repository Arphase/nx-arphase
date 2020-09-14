import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtFormComponent } from './form.component';

describe('IvtFormComponent', () => {
  let component: IvtFormComponent;
  let fixture: ComponentFixture<IvtFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
