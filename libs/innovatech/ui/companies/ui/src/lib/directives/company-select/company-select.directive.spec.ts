import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyCollectionService } from '@innovatech/ui/companies/data';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { of } from 'rxjs';

import { CompanySelectDirective } from './company-select.directive';

describe('CompanySelectDirective', () => {
  @Component({
    selector: 'ivt-test',
    standalone: false,
  })
  class HostComponent {
    form = new FormGroup({ test: new FormControl('') });
  }

  let spectator: SpectatorDirective<CompanySelectDirective>;

  const createDirective = createDirectiveFactory({
    directive: CompanySelectDirective,
    host: HostComponent,
    imports: [NzSelectModule, ReactiveFormsModule],
    providers: [{ provide: CompanyCollectionService, useValue: { options$: of([]) } }],
  });

  beforeEach(() => {
    spectator = createDirective(
      `<form [formGroup]="form"><nz-select formControlName="test" ivtCompanySelect></nz-select></form>`,
    );
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
