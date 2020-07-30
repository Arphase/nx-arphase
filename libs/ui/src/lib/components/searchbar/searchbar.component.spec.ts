import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtSearchbarComponent } from './searchbar.component';

describe('IvtSearchbarComponent', () => {
  let component: IvtSearchbarComponent;
  let fixture: ComponentFixture<IvtSearchbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtSearchbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
