import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtListContainerComponent } from './list-container.component';

describe('IvtListContainerComponent', () => {
  let component: IvtListContainerComponent;
  let fixture: ComponentFixture<IvtListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IvtListContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
