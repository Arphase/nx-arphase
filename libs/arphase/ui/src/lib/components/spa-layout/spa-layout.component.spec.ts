import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaLayoutComponent } from './spa-layout.component';

describe('SpaLayoutComponent', () => {
  let component: SpaLayoutComponent;
  let fixture: ComponentFixture<SpaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
