enum ValidatorTypes {
  required = 'required',
  max = 'max',
  min = 'min',
  email = 'email',
  rfc = 'rfc',
  minlength = 'minlength',
  maxlength = 'maxlength',
  matDatepickerParse = 'matDatepickerParse',
  phone = 'phone',
  requiredNumber = 'requiredNumber',
}

export const autoTips: Record<string, Record<string, string>> = {
  // en: {
  //   [ValidatorTypes.required]: `El campo es requerido`,
  //   [ValidatorTypes.max]: `El campo no debe ser mayor a ${errorValue.max}`,
  //   [ValidatorTypes.min]: `El campo debe ser mayor o igual a ${errorValue.min}`,
  //   [ValidatorTypes.email]: `El campo no tiene un formato incorrecto`,
  //   [ValidatorTypes.rfc]: `El campo no tiene formato de RFC`,
  //   [ValidatorTypes.minlength]: `El campo debe tener al menos ${errorValue.requiredLength} caracteres`,
  //   [ValidatorTypes.maxlength]: `El campo debe tener menos de ${errorValue.requiredLength + 1} caracteres`,
  //   [ValidatorTypes.phone]: `El campo tiene un formato incorrecto`,
  //   [ValidatorTypes.requiredNumber]: `El campo no se ha llenado o tiene un formato de número incorrecto`,
  // },
};
