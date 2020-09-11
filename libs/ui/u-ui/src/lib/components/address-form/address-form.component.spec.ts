import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtAddressFormComponent } from './address-form.component';

describe('IvtAddressFormComponent', () => {
  let component: IvtAddressFormComponent;
  let fixture: ComponentFixture<IvtAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
