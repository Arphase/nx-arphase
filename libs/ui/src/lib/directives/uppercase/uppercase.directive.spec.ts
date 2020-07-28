import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { IvtUppercaseDirective } from './uppercase.directive';

@Component({
  selector: 'ivt-test-host',
  template: `
    <div>
      <input #inputEl cdpUppercase [formControl]="control" />
    </div>
  `,
})
export class TestHostComponent {
  @ViewChild('inputEl')
  inputEl: HTMLInputElement;

  control = new FormControl('');
}

describe('IvtUppercaseDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestHostComponent, IvtUppercaseDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it(`should convert the input's value to uppercase`, () => {
    fixture.detectChanges();

    component.control.patchValue('test');

    expect(component.control.value).toEqual('TEST');
  });
});
