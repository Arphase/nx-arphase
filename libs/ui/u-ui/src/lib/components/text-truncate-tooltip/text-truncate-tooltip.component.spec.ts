import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtTextTruncateTooltipComponent } from './text-truncate-tooltip.component';

describe('IvtTextTruncateTooltipComponent', () => {
  let component: IvtTextTruncateTooltipComponent;
  let fixture: ComponentFixture<IvtTextTruncateTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvtTextTruncateTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtTextTruncateTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
