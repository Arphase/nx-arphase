import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtFormContainerComponent } from './form-container.component';

describe('IvtFormContainerComponent', () => {
  let component: IvtFormContainerComponent;
  let fixture: ComponentFixture<IvtFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtFormContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
