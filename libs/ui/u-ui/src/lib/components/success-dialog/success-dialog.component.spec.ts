import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtSuccessDialogComponent } from './success-dialog.component';

describe('IvtSuccessDialogComponent', () => {
  let component: IvtSuccessDialogComponent;
  let fixture: ComponentFixture<IvtSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvtSuccessDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
