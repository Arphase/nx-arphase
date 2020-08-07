import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtConfirmationDialogComponent } from './confirmation-dialog.component';

describe('IvtConfirmationDialogComponent', () => {
  let component: IvtConfirmationDialogComponent;
  let fixture: ComponentFixture<IvtConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvtConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
