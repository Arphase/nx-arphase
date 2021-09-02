import { FormControl, FormGroup } from '@angular/forms';
import { ApsValidators } from '@arphase/ui/core';

export function createSignInForm(): FormGroup {
  return new FormGroup({
    email: new FormControl(null, [ApsValidators.required, ApsValidators.email]),
    password: new FormControl(null, ApsValidators.required),
  });
}
