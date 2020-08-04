import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtExpansionPanelComponent } from './expansion-panel.component';

describe('IvtExpansionPanelComponent', () => {
  let component: IvtExpansionPanelComponent;
  let fixture: ComponentFixture<IvtExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
