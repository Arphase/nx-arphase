import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeListContainerComponent } from './guarantee-list-container.component';

describe('GuaranteeListContainerComponent', () => {
  let component: GuaranteeListContainerComponent;
  let fixture: ComponentFixture<GuaranteeListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuaranteeListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuaranteeListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
