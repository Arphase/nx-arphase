import { SimpleChange } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { GuaranteeFormComponent } from './guarantee-form.component';
import { createGuaranteeForm } from './guarantee-form.constants';

describe('GuaranteeFormComponent', () => {
  let spectator: Spectator<GuaranteeFormComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeFormComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent({ props: { form: createGuaranteeForm() } })));
  it('should should disable the companyId control is showCompanyInput property is false', () => {
    spectator.component.showCompanyInput = false;

    spectator.component.ngOnChanges({ showCompanyInput: new SimpleChange(false, false, false) });

    expect(spectator.component.form.get('companyId').disabled).toBeTruthy();
  });
});
