import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListContainerComponent } from './place-list-container.component';

describe('PlaceListContainerComponent', () => {
  let component: PlaceListContainerComponent;
  let fixture: ComponentFixture<PlaceListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
