import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtAutocompleteComponent } from './autocomplete.component';

describe('IvtAutocompleteComponent', () => {
  let component: IvtAutocompleteComponent;
  let fixture: ComponentFixture<IvtAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvtAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
