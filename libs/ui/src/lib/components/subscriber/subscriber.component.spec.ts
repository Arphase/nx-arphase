import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtSubscriberComponent } from './subscriber.component';

describe('IvtSubscriberComponent', () => {
  let component: IvtSubscriberComponent;
  let fixture: ComponentFixture<IvtSubscriberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtSubscriberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
