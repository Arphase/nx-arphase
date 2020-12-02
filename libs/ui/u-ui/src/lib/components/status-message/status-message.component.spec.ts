import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtStatusMessageComponent } from './status-message.component';

describe('IvtStatusMessageComponent', () => {
  let component: IvtStatusMessageComponent;
  let fixture: ComponentFixture<IvtStatusMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvtStatusMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtStatusMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
