import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { ProductSelectDirective } from './product-select.directive';

describe('ProductSelectDirective', () => {
  @Component({
    selector: 'ivt-test',
    standalone: false,
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<ProductSelectDirective>;

  const createDirective = createDirectiveFactory({
    directive: ProductSelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: ProductCollectionService, useValue: { options$: of([]), queryParams$: of({}) } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" ivtProductSelect></nz-select></form>`,
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
