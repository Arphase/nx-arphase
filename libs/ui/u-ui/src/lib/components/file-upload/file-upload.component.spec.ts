import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvtFileUploadComponent } from './file-upload.component';

describe('IvtFileUploadComponent', () => {
  let component: IvtFileUploadComponent;
  let fixture: ComponentFixture<IvtFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvtFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvtFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
